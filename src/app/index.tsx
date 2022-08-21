import React from "react";
import "./index.scss";
import { withProviders } from "./providers";
import { Routing } from "../pages";

const App = () => <Routing />;

export default withProviders(App);
