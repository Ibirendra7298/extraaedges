import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Card, Button, Modal } from 'react-bootstrap';

import { AiTwotoneMail, AiTwotonePhone, AiFillDribbbleCircle, AiOutlineHeart, AiFillHeart, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

export default function PersonDetailCard({ person, persons, setPersons }) {
    const [show, setShow] = useState(false);
    const [name, setName] = useState(person.name);
    const [email, setEmail] = useState(person.email);
    const [phone, setPhone] = useState(person.phone);
    const [website, setWebsite] = useState(person.website);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        setPersons(persons.map((personDetail) => {

            if (personDetail.id === person.id) {

                return { ...personDetail, name: `${name}`, email: `${email}`, phone: `${phone}`, website: `${website}`, };
            }
            return personDetail;
        }))

    }

    const handleLike = () => {
        setPersons(persons.map((personDetail) => {

            if (personDetail.id === person.id) {

                return { ...personDetail, isLiked: !person.isLiked };
            }
            return personDetail;
        }))

    }
    const handleDelete = () => {
        setPersons(persons.filter((item) => item.id !== person.id));
    }
    return (
        <>
            <Col className="container-fluid mt-4">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={person.avatar} />
                    <Card.Body>
                        <Card.Title>{person.name}</Card.Title>
                        <Card.Text>

                            <div><AiTwotoneMail /> {person.email}</div>
                            <div><AiTwotonePhone /> {person.phone}</div>
                            <div><AiFillDribbbleCircle /> {person.website}</div>
                        </Card.Text>
                        <Card.Footer className="text-muted">
                            <span onClick={handleLike}>{!person.isLiked ? <AiOutlineHeart /> : <AiFillHeart />}</span>
                            <span style={{ margin: "50px" }} onClick={handleShow}><AiOutlineEdit />  </span>
                            <span onClick={handleDelete}><AiOutlineDelete /> </span>
                        </Card.Footer>

                    </Card.Body>
                </Card>
            </Col>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: "10px" }}>
                            <label style={{ marginRight: "10px" }}>Name:</label>
                            <input id="name" type="text" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <label style={{ marginRight: "10px" }}>Email:</label>
                            <input type="text" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <label style={{ marginRight: "10px" }}>Phone:</label>
                            <input type="text" onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <label style={{ marginRight: "5px" }}>Website:</label>
                            <input type="text" onChange={(e) => setWebsite(e.target.value)} />
                        </div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button type="submit" variant="primary" onClick={handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>

            </Modal>
        </>
    )
}