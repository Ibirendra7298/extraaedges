import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardGroup from 'react-bootstrap/CardGroup'
import Container from "react-bootstrap/Container";
import axios from 'axios';

import PersonDetailCard from './PersonDetailCard';


export default function PersonList() {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
                const users = []

                for (let i = 0; i < response.data.length; i++) {
                    const user = {};
                    user.name = response.data[i]['name'];
                    user.email = response.data[i]['email'];
                    user.address = response.data[i]['address'];
                    user.phone = response.data[i]['phone'];
                    user.website = response.data[i]['website'];
                    user.company = response.data[i]['company'];
                    user.username = response.data[i]['username'];
                    user.id = Math.random() * 1000;
                    user.isLiked = false;

                    const pictureUrl = `https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`;
                    user.avatar = pictureUrl;

                    users.push(user);

                }

                setPersons(users);
            })
            .catch((error) => {
                console.log(error);
            })

    }, []);

    return (
        <div>
            <Container>
                <CardGroup>
                    {persons.map((person) => {
                        return (

                            <PersonDetailCard
                                person={person}
                                key={person.id}
                                persons={persons}
                                setPersons={setPersons}
                            />
                        )
                    })}
                </CardGroup>
            </Container>
        </div>
    )
}