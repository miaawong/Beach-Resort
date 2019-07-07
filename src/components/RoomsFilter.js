import React from "react";
// from hooks
import { useContext } from "react";
import { RoomContext } from "../context";
import Title from "../components/Title";

export default function RoomsFilter() {
    // hooks! the way to access Context with Hooks API
    const context = useContext(RoomContext);
    const {
        handleChange,
        type,
        capacity,
        price,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets
    } = context;
    return <div>rooms filter</div>;
}
