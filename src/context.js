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
        loading: true,
        type: "all",
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    };
    //getData = getData() will be run from external db
    componentDidMount() {
        // this.getData
        let rooms = this.formatData(items);
        // filter out all rooms that have featured = true
        let featuredRooms = rooms.filter(room => room.featured === true);
        // we wanna calc the max price from our data
        let maxPrice = Math.max(...rooms.map(room => room.price));
        let maxSize = Math.max(...rooms.map(room => room.size));
        // to schedule updates to the component local state
        this.setState({
            rooms,
            featuredRooms,
            sortedRooms: rooms,
            loading: false,
            price: maxPrice,
            maxPrice,
            maxSize
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
    //
    getRoom = slug => {
        // destructuring rooms
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug);
        return room;
    };
    //handleChange
    handleChange = event => {
        const type = event.target.type;
        const name = event.target.name;
        const value = event.target.value;
        console.log(`type:${type}, name:${name}, value:${value}`);
    };
    filterRooms = () => {
        console.log("hello");
    };

    render() {
        return (
            <RoomContext.Provider
                value={{
                    ...this.state,
                    getRoom: this.getRoom,
                    handleChange: this.handleChange
                }}
            >
                {this.props.children}
            </RoomContext.Provider>
        );
    }
}

const RoomConsumer = RoomContext.Consumer;
//higher order component
export function withRoomConsumer(Component) {
    // props = <roomconsumer props>
    return function ConsumerWrapper(props) {
        return (
            <RoomConsumer>
                {/*  returning the component that was passed in , access the possible props */}
                {value => <Component {...props} context={value} />}
            </RoomConsumer>
        );
    };
}
export { RoomProvider, RoomConsumer, RoomContext };
