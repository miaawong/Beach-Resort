import React from "react";
import Room from "./Room";

export default function RoomList({ rooms }) {
    // return a message if there are no rooms available
    if (rooms.length === 0) {
        return (
            <div className="empty-search">
                <h3>
                    Sorry! we couldn't find any rooms based on your search.
                    Please try again..
                </h3>
            </div>
        );
    }
    return (
        <section className="roomslist">
            <div className="roomslist-center">
                {rooms.map(room => {
                    return <Room key={room.id} room={room} />;
                })}
            </div>
        </section>
    );
}
