import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'

export default function Header() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const currentTheme = useSelector(state=>{
        return state.myDarkMode
    })
    const {colors} = useTheme();
    const mycolor = colors.iconColor;
    return (
        <View style={{
            paddingTop:10,
            height:45,
            backgroundColor:colors.headerColor,
            flexDirection:"row",
            justifyContent:"space-between",
            elevation:4
            }}>
            <View style={{
                flexDirection:"row"
            }}>
                <FontAwesome5 style={{
                    marginLeft:10
                }}
                 name={'youtube'} color="red" size={28} />
                <Text style={{
                    fontSize:22,
                    marginLeft:5,
                    fontWeight:"bold",
                    color:mycolor
                    }}>YouTube</Text>
            </View>
            <View style={{
                flexDirection:"row",
                justifyContent:"space-around",
                width:150
            }}>
                <FontAwesome size={28} color={mycolor} name={'video-camera'} />
                <FontAwesome 
                  size={28} 
                  color={mycolor} 
                  name={'search'} 
                  onPress={()=>navigation.navigate("search")}
                  />
                <MaterialCommunityIcons 
                  size={28} 
                  color={mycolor} 
                  name={'account-circle'}
                  onPress={()=>dispatch({type:"change_theme",payload:!currentTheme})} 
                  />
            </View>
        </View>
    )
}
