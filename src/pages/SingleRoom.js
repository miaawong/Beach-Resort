import React, { Component } from "react";
import defaultBackground from "../images/room-1.jpeg";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../context";
import StyledHero from "../components/StyledHero";

export default class SingleRoom extends Component {
    constructor(props) {
        super(props);
        // can access something that react router is giving us
        // the prop is passed by react router
        //  console.log(this.props);
        this.state = {
            slug: this.props.match.params.slug,
            defaultBackground
        };
    }
    static contextType = RoomContext;

    render() {
        const { getRoom } = this.context;
        const room = getRoom(this.state.slug);
        if (!room) {
            return (
                <div className="error">
                    <h3>
                        Sorry, no room could be found...
                        <Link to="/rooms" className="btn-primary">
                            Rooms
                        </Link>{" "}
                    </h3>
                </div>
            );
        }
        const {
            name,
            description,
            capacity,
            size,
            price,
            extras,
            breakfast,
            pets,
            images
        } = room;

        // display only three images, destructuring
        // mainImg = firstImg
        // array destructuring, defaultImg = the rest of the images
        // array destructuring defaultImg will give you an array
        // you would have to keep track of how many images are in the images array
        // for example, destructuring another image, ...defaultImg will have 1 less image
        const [mainImg, ...defaultImg] = images;

        return (
            <>
                <StyledHero img={mainImg || this.state.defaultBackground}>
                    <Banner title={`${name} room`}>
                        <Link to="/rooms" className="btn-primary">
                            Back to Rooms
                        </Link>
                    </Banner>
                </StyledHero>
                <section className="single-room">
                    {/* destructuring to only render 3 out of 4 images... you can just map through all the images instead */}
                    <div className="single-room-images">
                        {defaultImg.map((image, index) => {
                            return <img key={index} src={image} alt={name} />;
                        })}
                    </div>
                    <div className="single-room-info">
                        <article className="desc">
                            <h3>details</h3>
                            <p>{description}</p>
                        </article>
                        <article className="info">
                            <h3>Info</h3>
                            <h6>Price :${price}</h6>
                            <h6>Size : {size} Sq ft</h6>
                            {/* conditional rendering */}
                            <h6>
                                Max Capacity :{" "}
                                {capacity > 1
                                    ? `${capacity} people`
                                    : `${capacity} person`}{" "}
                            </h6>
                            <h6>{pets ? "pets allowed" : "No pets allowed"}</h6>
                            <h6>{breakfast && "free breakfast included"}</h6>
                        </article>
                    </div>
                </section>
                <section className="room-extras">
                    <h6>extras</h6>
                    <ul className="extras">
                        {extras.map((extra, index) => {
                            return <li key={index}> - {extra}</li>;
                        })}
                    </ul>
                </section>
            </>
        );
    }
}
