import React, { useState, useEffect } from 'react';
import { Button,  } from 'react-bootstrap';
import { colors } from '../utils/colors';
import {getAnnouncements, addAnnouncement} from '../api/announcementApi';

const Announce = () => {
    const [announcement, setAnnouncement] = useState('');
    const [announcements, setAnnouncements] = useState([]);


    useEffect(() =>{
        const fetchAnnouncements = async () => {
            const data = await getAnnouncements();
            setAnnouncements(data);
        };
        fetchAnnouncements();

    },[]);

    const handleAnnouncementChange = (e) => {
        setAnnouncement(e.target.value);
    };

    const handleAddAnnouncement = async () => {
        if (announcement) {
            try{
                const response = await addAnnouncement(announcement);
            setAnnouncements([...announcements, announcement]);
            setAnnouncement(''); 
            }catch (error) {
                console.error('failed to add announcement:', error);
            }
        }
    };

    return (
        <div>
            <h2>Announcements</h2>
            <div>
                <textarea
                    value={announcement}
                    onChange={handleAnnouncementChange}
                    placeholder="Write your announcement here..."
                    rows="4"
                    cols="50"
                />
            </div>
            <Button
                    variant="primary"
                    className="mx-2"
                    style={{ backgroundColor: colors.secondary }}
                    onClick={handleAddAnnouncement}
                >
                    Add Announcement
                </Button>

           
            <ul>
                {announcements.length === 0 ? (
                    <li>No announcements yet.</li>  
                ) : (
                    announcements.map((ann, index) => (
                        <li key={index}>{ann.content}</li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Announce;
