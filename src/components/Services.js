import React, { Component } from "react";
import Title from "./Title";
import {
    FaCocktail,
    FaHiking,
    FaShuttleVan,
    FaSwimmingPool
} from "react-icons/fa";

export default class Services extends Component {
    state = {
        services: [
            {
                icon: <FaCocktail />,
                title: "Free Cocktails",
                info:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quid ergo? Duo Reges: constructio interrete. "
            },
            {
                icon: <FaHiking />,
                title: "Hiking Trails",
                info:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quid ergo? Duo Reges: constructio interrete. "
            },
            {
                icon: <FaShuttleVan />,
                title: "Free Shuttles",
                info:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quid ergo? Duo Reges: constructio interrete. "
            },
            {
                icon: <FaSwimmingPool />,
                title: "Beautiful Pool",
                info:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quid ergo? Duo Reges: constructio interrete. "
            }
        ]
    };
    render() {
        return (
            <section className="services">
                <Title title="Services" />
                <div className="services-center">
                    {this.state.services.map((service, index) => {
                        return (
                            <article key={index} className="service">
                                <span>{service.icon}</span>
                                <h6>{service.title}</h6>
                                <p>{service.info}</p>
                            </article>
                        );
                    })}
                </div>
            </section>
        );
    }
}
