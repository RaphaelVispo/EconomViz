import { createContext } from "react";

export const config = {
    demand: {
        original: {
            qd: [0, 10, 20, 30, 40],
            price: [40, 30, 20, 10, 0]
        },
        regression: {
            qd: [],
            price: []
        },
    },
    supply: {
        original: {
            qd: [0, 10, 20, 30, 40],
            price: [0, 10, 20, 30, 40],
        },
        regression: {
            qd: [],
            price: []
        },
    },
    slope: 0,
    shift: 0,

}




