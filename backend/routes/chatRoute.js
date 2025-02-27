const express = require("express");
const router = express.Router();
const db = require("../config/database"); // Import database connection

// Create or get existing chat
router.post("/create", async (req, res) => {
    try {
        const { chat_type, user_ids, group_name } = req.body;

        if (!chat_type) {
            return res.status(400).json({ message: "Chat type is required" });
        }

        let chat_id;

        if (chat_type === "individual") {
            if (!user_ids || user_ids.length !== 2) {
                return res.status(400).json({ message: "Individual chat requires exactly 2 users" });
            }

            // Check if chat already exists
            const [existingChat] = await db.query(
                `SELECT id FROM chats 
                WHERE id IN (SELECT chat_id FROM chat_members WHERE user_id = ?) 
                AND id IN (SELECT chat_id FROM chat_members WHERE user_id = ?)`,
                [user_ids[0], user_ids[1]]
            );

            if (existingChat.length > 0) {
                return res.status(200).json({ message: "Chat already exists", chat_id: existingChat[0].id });
            }

            // Create new individual chat
            const [newChat] = await db.query(
                "INSERT INTO chats (chat_type) VALUES ('individual')"
            );

            chat_id = newChat.insertId;

            // Add users to `chat_members`
            const values = user_ids.map(user_id => [chat_id, user_id]);
            await db.query("INSERT INTO chat_members (chat_id, user_id) VALUES ?", [values]);

        } else if (chat_type === "group") {
            if (!group_name || !user_ids || user_ids.length === 0) {
                return res.status(400).json({ message: "Group name and user IDs are required for group chats" });
            }

            // Create new group chat
            const [newChat] = await db.query(
                "INSERT INTO chats (chat_type, group_name) VALUES ('group', ?)",
                [group_name]
            );

            chat_id = newChat.insertId;

            // Add users to `chat_members`
            const values = user_ids.map(user_id => [chat_id, user_id]);
            await db.query("INSERT INTO chat_members (chat_id, user_id) VALUES ?", [values]);

        } else if (chat_type === "social") {
            // Check if a social chat already exists
            const [existingSocial] = await db.query(
                "SELECT id FROM chats WHERE chat_type = 'social' LIMIT 1"
            );

            if (existingSocial.length > 0) {
                return res.status(200).json({ message: "Social chat already exists", chat_id: existingSocial[0].id });
            }

            // Create social chat
            const [newChat] = await db.query(
                "INSERT INTO chats (chat_type) VALUES ('social')"
            );

            chat_id = newChat.insertId;
        }

        res.status(201).json({ message: "Chat created successfully", chat_id });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Get all chats for a user
router.get("/list/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;

        // Fetch all chats the user is part of
        const [chats] = await db.query(
            `SELECT 
                c.id AS chat_id, 
                c.chat_type, 
                c.group_name, 
                (SELECT message FROM messages WHERE chat_id = c.id ORDER BY timestamp DESC LIMIT 1) AS last_message,
                (SELECT timestamp FROM messages WHERE chat_id = c.id ORDER BY timestamp DESC LIMIT 1) AS last_message_time
            FROM chats c
            LEFT JOIN chat_members cm ON c.id = cm.chat_id
            WHERE c.chat_type = 'social' OR cm.user_id = ?
            ORDER BY last_message_time DESC`,
            [user_id]
        );

        // Loop through chats and fetch receiver details for individual chats
        for (let chat of chats) {
            if (chat.chat_type === "individual") {
                // Fetch receiver details (excluding the requesting user)
                const [receiverData] = await db.query(
                    `SELECT 
                        u.id AS receiver_id, u.username, u.email, u.created_at,
                        u.mainGroupCode, u.subGroup1Code, u.subGroup2Code, u.subGroup3Code, u.subGroup4Code,
                        u.name, u.fatherName, u.displayName, u.DOB, u.landline, u.companyName,
                        u.workingCountry, u.workingCity, u.occupation, u.mobile, u.gender
                    FROM chat_members cm
                    JOIN users u ON cm.user_id = u.id
                    WHERE cm.chat_id = ? AND u.id != ?`,
                    [chat.chat_id, user_id]
                );

                if (receiverData.length > 0) {
                    chat.receiver = receiverData[0]; // Attach receiver details to the chat
                }
            }
        }

        res.status(200).json({ message: "Chats retrieved", chats });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Get chat messages
router.get("/messages/:chat_id", async (req, res) => {
    try {
        const { chat_id } = req.params;
        if (!chat_id) {
            return res.status(400).json({ message: "Chat ID is required" });
        }

        // Fetch messages with sender details
        const [messages] = await db.query(
            `SELECT 
                m.id AS message_id, m.sender_id, u.username AS sender_name, 
                m.message, m.timestamp 
            FROM messages m
            JOIN users u ON m.sender_id = u.id
            WHERE m.chat_id = ?
            ORDER BY m.timestamp ASC`,
            [chat_id]
        );

        // Fetch chat type (to determine if a receiver exists)
        const [chatInfo] = await db.query(
            `SELECT chat_type FROM chats WHERE id = ?`, [chat_id]
        );

        let receiver = null;

        if (chatInfo.length > 0 && chatInfo[0].chat_type === "individual") {
            // Fetch receiver details (excluding the requesting user)
            const [receiverData] = await db.query(
                `SELECT 
                    u.id AS receiver_id, u.username, u.email, u.created_at,
                    u.mainGroupCode, u.subGroup1Code, u.subGroup2Code, u.subGroup3Code, u.subGroup4Code,
                    u.name, u.fatherName, u.displayName, u.DOB, u.landline, u.companyName,
                    u.workingCountry, u.workingCity, u.occupation, u.mobile, u.gender
                FROM chat_members cm
                JOIN users u ON cm.user_id = u.id
                WHERE cm.chat_id = ? AND u.id NOT IN (SELECT sender_id FROM messages WHERE chat_id = ? LIMIT 1)`,
                [chat_id, chat_id]
            );

            if (receiverData.length > 0) {
                receiver = receiverData[0]; // Attach receiver details
            }
        }

        res.status(200).json({ 
            message: "Messages retrieved", 
            messages, 
            receiver 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


// Send a message
router.post("/send", async (req, res) => {
    try {
        const { chat_id, sender_id, message, type, attachments } = req.body;

        if (!chat_id || !sender_id || (!message && (!attachments || attachments.length === 0))) {
            return res.status(400).json({ message: "Chat ID, sender ID, and either a message or attachments are required" });
        }

        // Check if chat exists
        const [chatCheck] = await db.query(
            "SELECT chat_type FROM chats WHERE id = ?", 
            [chat_id]
        );

        if (chatCheck.length === 0) {
            return res.status(404).json({ message: "Chat does not exist" });
        }

        // Convert attachments array to JSON string (if provided)
        const attachmentsJson = attachments && attachments.length > 0 ? JSON.stringify(attachments) : null;

        // Insert the message
        const [newMessage] = await db.query(
            "INSERT INTO messages (chat_id, sender_id, message, type, attachments) VALUES (?, ?, ?, ?, ?)",
            [chat_id, sender_id, message || null, type || "text", attachmentsJson]
        );

        res.status(201).json({ 
            message: "Message sent successfully", 
            message_id: newMessage.insertId, 
            chat_id, 
            sender_id, 
            text: message, 
            type: type || "text", 
            attachments: attachments || [], 
            timestamp: new Date() 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.delete("/delete-chat/:chat_id", async (req, res) => {
    try {
        const { chat_id } = req.params;

        // Check if chat exists
        const [chatCheck] = await db.query("SELECT id FROM chats WHERE id = ?", [chat_id]);
        if (chatCheck.length === 0) {
            return res.status(404).json({ message: "Chat not found" });
        }

        // Delete messages first (to avoid FK constraints)
        await db.query("DELETE FROM messages WHERE chat_id = ?", [chat_id]);

        // Delete chat members
        await db.query("DELETE FROM chat_members WHERE chat_id = ?", [chat_id]);

        // Delete chat
        await db.query("DELETE FROM chats WHERE id = ?", [chat_id]);

        res.status(200).json({ message: "Chat deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.delete("/delete-message/:message_id", async (req, res) => {
    try {
        const { message_id } = req.params;

        // Check if message exists
        const [messageCheck] = await db.query("SELECT id FROM messages WHERE id = ?", [message_id]);
        if (messageCheck.length === 0) {
            return res.status(404).json({ message: "Message not found" });
        }

        // Delete message
        await db.query("DELETE FROM messages WHERE id = ?", [message_id]);

        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.get("/search-messages/:chat_id", async (req, res) => {
    try {
        const { chat_id } = req.params;
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const [messages] = await db.query(
            `SELECT id AS message_id, sender_id, message, timestamp
            FROM messages
            WHERE chat_id = ? AND message LIKE ? ORDER BY timestamp DESC`,
            [chat_id, `%${query}%`]
        );

        res.status(200).json({ message: "Messages retrieved", results: messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

 
router.get("/search-chats/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const [chats] = await db.query(
            `SELECT 
                c.id AS chat_id, c.chat_type, c.group_name, 
                (SELECT message FROM messages WHERE chat_id = c.id ORDER BY timestamp DESC LIMIT 1) AS last_message
            FROM chats c
            LEFT JOIN chat_members cm ON c.id = cm.chat_id
            WHERE 
                (c.group_name LIKE ? OR 
                EXISTS (SELECT 1 FROM messages WHERE chat_id = c.id AND message LIKE ?)) 
                AND (c.chat_type = 'social' OR cm.user_id = ?)
            ORDER BY last_message DESC`,
            [`%${query}%`, `%${query}%`, user_id]
        );

        res.status(200).json({ message: "Chats retrieved", results: chats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});



module.exports = router;
