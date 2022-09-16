import React, { FunctionComponent } from "react";
import { ImageStyle, Image } from "react-native";
import { Maybe } from "../../generated/graphql";
import { DefaultData } from "../../utils/DefaultData";

/**
 * A wrapper around React-native image that will display a default image in case of uri = undefined
 */
const ImageComponent:FunctionComponent<{
    style?:  ImageStyle | undefined;
    uri?: string | Maybe<string>
}> = ({style: customStyle, uri}) => {

    return (
        <Image
            style={customStyle}
            source={{ uri: uri ? uri : DefaultData.IMAGE_URL_FALLBACK }}
        />
    )
}

export {ImageComponent};