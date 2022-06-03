import React from "react";
import { render } from "react-dom";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";
import Pusher from "pusher-js";

import Echo from "laravel-echo";
import axios from "axios";
import { RecoilRoot } from "recoil";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => require(`./Pages/${name}`),
    setup({ el, App, props }) {
        return render(
            <RecoilRoot>
                <App {...props} />
            </RecoilRoot>,
            el
        );
    },
});

InertiaProgress.init({ color: "#4B5563" });

window.Echo = new Echo({
    broadcaster: "pusher",
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    forceTLS: true,
    authorizer: (channel, options) => {
        return {
            authorize: (socketId, callback) => {
                axios({
                    url: "/broadcasting/auth",
                    method: "POST",
                    data: {
                        socket_id: socketId,
                        channel_name: channel.name,
                    },
                })
                    .then((response) => {
                        callback(false, response.data);
                    })
                    .catch((error) => {
                        callback(true, error);
                    });
            },
        };
    },
});
