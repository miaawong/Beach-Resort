import React, { Component } from "react";
import items from "./data";
const RoomContext = React.createContext();
// <RoomContext.Provider value= {}

class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        // getting external data, if the data is still loading, we shouldn't be rendering
        loading: true
    };
    //getData = getData() will be run from external db
    componentDidMount() {
        // this.getData
        let rooms = this.formatData(items);
        // filter out all rooms that have featured = true
        let featuredRooms = rooms.filter(room => room.featured === true);
        // to schedule updates to the component local state
        this.setState({
            rooms,
            featuredRooms,
            sortedRooms: rooms,
            loading: false
        });
    }
    // formatting from data.js
    formatData(items) {
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);
            let room = { ...item.fields, images, id };
            return room;
        });
        return tempItems;
    }

    render() {
        return (
            <RoomContext.Provider value={{ ...this.state }}>
                {this.props.children}
            </RoomContext.Provider>
        );
    }
}

const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };
