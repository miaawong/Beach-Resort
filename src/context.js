import React, { Component } from "react";
//import items from "./data";
import Client from "./Contentful";

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
    //getData = getData() will be run from contentful
    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: "beachResortRooms",
                order: "fields.price"
            });
            let rooms = this.formatData(response.items);
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
        } catch (error) {
            console.log(error);
        }
    };

    componentDidMount() {
        this.getData();
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
        const target = event.target;
        // for checkboxes or not
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = event.target.name;
        this.setState(
            {
                [name]: value
            },
            this.filterRooms
        );
        // const type = event.target.type;
        // const name = event.target.name;
        // const value = event.target.value;
        // console.log(`type:${type}, name:${name}, value:${value}`);
    };

    // this is a callback function
    // we run this, when the state is actually changed, '[name]: value' is changed
    filterRooms = () => {
        let {
            rooms,
            type,
            capacity,
            price,
            minSize,
            maxSize,
            breakfast,
            pets
        } = this.state;

        // set a temp value for all the rooms
        let tempRooms = [...rooms];
        // transform value from string to number
        // the newly set capacity value from handleChange
        capacity = parseInt(capacity);
        price = parseInt(price);

        // filter by 'type'
        if (type !== "all") {
            tempRooms = tempRooms.filter(room => room.type === type);
        }

        // filter by 'capacity'
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity);
        }

        // filter by 'price'
        tempRooms = tempRooms.filter(room => room.price <= price);

        // filter by 'size'
        tempRooms = tempRooms.filter(
            room => room.size >= minSize && room.size <= maxSize
        );

        // filter by 'breakfast'
        if (breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === true);
        }

        //filter by 'pets'
        if (pets) {
            tempRooms = tempRooms.filter(room => room.pets === true);
        }

        // change state: tempRooms to sortedRooms to state
        this.setState({
            sortedRooms: tempRooms
        });
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
