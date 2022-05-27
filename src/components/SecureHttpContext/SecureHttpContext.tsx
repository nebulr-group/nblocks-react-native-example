import React from "react";
import { AuthApi } from "../../utils/AuthApi";

const initialData = new AuthApi();
const SecureHttpContext = React.createContext(initialData);

export {SecureHttpContext, initialData};