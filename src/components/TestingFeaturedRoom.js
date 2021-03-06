import React, { Component } from "react";
import { RoomConsumer } from "../context";
import Title from "./Title";
import Room from "./Room";
import Loading from "./Loading";

export default class FeaturedRooms extends Component {
    //class based component's consumer... since context.consumer is proved to be buggy
    // static contextType = RoomContext;
    render() {
        // loop through each featured rooms and return <Room> component with the list of featured rooms
        return (
            // using roomconsumer instead of contexttype
            <RoomConsumer>
                {context => {
                    let { loading, featuredRooms: rooms } = context;
                    rooms = rooms.map(room => {
                        return <Room key={room.id} room={room} />;
                    });
                    return (
                        <section className="featured-rooms">
                            <Title title="Featured Rooms" />
                            <div className="featured-rooms-center">
                                {/* if loading = true, set loading component (has loading
                    screen) : or render the rooms */}
                                {loading ? <Loading /> : rooms}
                            </div>
                        </section>
                    );
                }}
            </RoomConsumer>
        );
    }
}
