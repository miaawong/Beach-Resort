import React, { Component } from "react";
import defaultBackground from "../images/room-1.jpeg";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../context";

export default class SingleRoom extends Component {
    constructor(props) {
        super(props);
        // can access something that react router is giving us
        // the prop is passed by react router
        // this.props is from app.js, where we assigned component = {SingleRoom}
        console.log(this.props);
    }

    render() {
        return (
            <Hero>
                <Banner title="Our rooms" subtitle="check it out" />
            </Hero>
        );
    }
}
