import React from "react";
// does the filtering
import RoomsFilter from "./RoomsFilter";
// retrieves the filtered rooms
import RoomsList from "./RoomsList";
import { withRoomConsumer } from "../context";
import Loading from "./Loading";

// with higher order component
function RoomContainer({ context }) {
    const { rooms, loading, sortedRooms } = context;
    if (loading) {
        return <Loading />;
    }
    return (
        <div>
            <RoomsFilter rooms={rooms} />
            <RoomsList rooms={sortedRooms} />
        </div>
    );
}

export default withRoomConsumer(RoomContainer);

// export default function RoomsContainer() {
//     return (
//         <RoomConsumer>
//             {value => {
//                 const { rooms, loading, sortedRooms } = value;
//                 if (loading) {
//                     return <Loading />;
//                 }
//                 return (
//                     <div>
//                         hello from rooms container
//                         <RoomsFilter rooms={rooms} />
//                         <RoomsList rooms={sortedRooms} />
//                     </div>
//                 );
//             }}
//         </RoomConsumer>
//     );
// }
