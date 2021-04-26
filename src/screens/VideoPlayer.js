import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview'

const VideoPlayer = ({route}) => {
    const {videoId,title} = route.params
    return (
        <View style={{flex:1}}>
            <View style={{
                width:"100%",
                height:200
            }}>
                <WebView
                  javaScriptEnabled={true}
                  source={{uri:`https://www.youtube.com/embed/${videoId}`}}
                />
            </View>
            <Text style={{
                fontSize:20,
                width:Dimensions.get("screen").width - 50,
                margin:10
            }}
            numberOfLines={2}
            ellipsizeMode="tail"
            >
                {title}
            </Text>
            <View
              style={{
                  borderBottomWidth:1
              }}
            />
        </View>
    )
}

export default VideoPlayer