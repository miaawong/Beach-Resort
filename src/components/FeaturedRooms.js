import React, { Component } from "react";
import { RoomContext } from "../context";
import Title from "./Title";
import Room from "../pages/Room";

export default class FeaturedRooms extends Component {
    static contextType = RoomContext;
    render() {
        const { loading, featuredRooms: rooms } = this.context;
        rooms = rooms.map(room => {
            return <Room key={room.id} room={room} />;
        });
        return (
            <section className="featured-rooms">
                <Title title="Featured Rooms" />
                <div className="featured-room-center">{}</div>
            </section>
        );
    }
}
