import React from 'react';
import { Nav, Accordion, Card , useAccordionButton} from 'react-bootstrap';
import { AiOutlineHome } from 'react-icons/ai';
import { TbUsersPlus, TbBriefcase, TbUserShare, TbUsersGroup} from 'react-icons/tb';
import { MdReportGmailerrorred, MdOutlineDescription, MdOutlineLocationOn, MdOutlineMap } from 'react-icons/md';
import { GrDocumentUser } from 'react-icons/gr';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css'; // Import shared Dashboard styles
import { colors } from '../utils/colors';


const CustomToggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionButton(eventKey);
    return (
        <Card.Header onClick={decoratedOnClick}>
            {children}
        </Card.Header>
    );
};

const Sidebar = () => {
    return (
        <div style={{backgroundColor: colors.primary}}className="border-end"  id="sidebar">
            <Nav className="flex-column" >
                {/* Dashboard Item */}
                <Nav.Item className='mt-3 mb-3' >
                    <Nav.Link as={Link} to="/dashboard" className='text-light'>
                        <AiOutlineHome className="me-2" /> Dashboard
                    </Nav.Link>
                </Nav.Item>

                {/* Main Items with Subitems */}
                <Accordion flush>
                    <Card >
                        <CustomToggle eventKey="0">
                            <TbUsersPlus className="me-2" /> Users
                        </CustomToggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Nav className="flex-column">
                                    <Nav.Link as={Link} to="/dashboard/all-users" style={{color:colors.primary}}>
                                        All Users
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/dashboard/invited-users" style={{color:colors.primary}}>
                                        Invited Users
                                    </Nav.Link>
                                </Nav>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Card>
                        <CustomToggle as={Card.Header} eventKey="1">
                            <TbUsersGroup className="me-2" /> Groups
                        </CustomToggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <Nav className="flex-column">
                                    <Nav.Link as={Link} to="/dashboard/main-groups" style={{color:colors.primary}}>
                                        Main Group
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/dashboard/sub-group1" style={{color:colors.primary}}>
                                        Sub Group 1
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/dashboard/sub-group2" style={{color:colors.primary}}>
                                        Sub Group 2
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/dashboard/sub-group3" style={{color:colors.primary}}>
                                        Sub Group 3
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/dashboard/sub-group4" style={{color:colors.primary}}>
                                        Sub Group 4
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/dashboard/sub-group5" style={{color:colors.primary}}>
                                        Sub Group 5
                                    </Nav.Link>
                                </Nav>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <Nav.Item className='mt-2' >
                    <Nav.Link as={Link} to="/dashboard/reports" className='text-light'>
                        <HiOutlineDocumentReport className="me-2" /> Report
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className='mt-2' >
                    <Nav.Link as={Link} to="/dashboard/abuse-reports" className='text-light'>
                        <MdReportGmailerrorred className="me-2" /> Abuse Reports
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className='mt-2' >
                    <Nav.Link as={Link} to="/dashboard/occupations" className='text-light'>
                        <TbBriefcase className="me-2" /> Occupations
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className='mt-2' >
                    <Nav.Link as={Link} to="/dashboard/additional-responsibility" className='text-light'>
                        <GrDocumentUser className="me-2" /> Additional Resposibility
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className='mt-2' >
                    <Nav.Link as={Link} to="/dashboard/location" className='text-light'>
                        <MdOutlineLocationOn className="me-2" /> Location
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className='mt-2' >
                    <Nav.Link as={Link} to="/dashboard/job-description" className='text-light'>
                        <MdOutlineDescription className="me-2" /> Job Description
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className='mt-2' >
                    <Nav.Link as={Link} to="/dashboard/country" className='text-light'>
                        <MdOutlineMap className="me-2" /> Country
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className='mt-2' >
                    <Nav.Link as={Link} to="/dashboard/responsibility-type" className='text-light'>
                        <TbUserShare className="me-2" /> Resposibility Type
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
};

export default Sidebar;