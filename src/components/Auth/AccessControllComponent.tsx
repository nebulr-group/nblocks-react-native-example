import React, { FunctionComponent, useState } from "react";
import { View } from "react-native";
import { useAuth } from "../../hooks/auth-context";

const AccessControllComponent:FunctionComponent<{roles: string[]}> = ({children, roles}) => {

    const {currentUser} = useAuth();
    if (currentUser.hasRole(roles))
        return (<View>{children}</View>);
    else
        return (null);
}

export {AccessControllComponent};