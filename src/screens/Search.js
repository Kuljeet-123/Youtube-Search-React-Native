import React, {useEffect, useState} from 'react'
import { View, Text, ScrollView, TextInput, FlatList, ActivityIndicator } from 'react-native'
import Header from '../components/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MiniCard from '../components/MiniCard'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from '@react-navigation/native';

//https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=songs&type=video&key=api_key

const SearchScreen = ({navigation}) =>{
    const {colors} = useTheme();
    const textColor = colors.iconColor
    const [value,setValue] = useState('');
    const [maxResults,setMaxRsults] = useState(20);
    const dispatch = useDispatch();
    // const [miniCardData, setMiniCardData] = useState([]);
    const miniCardData = useSelector(state=>{
        return state.cardData;
    })
    const [loading,setLoading] = useState(false);
    

    useEffect(() => {
        // console.log("useEffect");
        // console.log("Current maxresults",maxResults);
        setLoading(true)
        fetchData()
        return ()=>{

        }
    }, [maxResults])

    const fetchData = async () => {
        setLoading(true)
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${value}&type=video&key=api_key`)
        .then(res=>res.json())
        .then(data=>{
            //console.log(data);
            setLoading(false)
            dispatch({type:"add",payload:data.items})
            // setMiniCardData(data.items);
        })
    }

    const handleLoadMore = () =>{
        //console.log("HandleMore called");
        setMaxRsults(maxResults+10);
        setLoading(true)
    }

    const renderFooter = () =>{
        //console.log("Renderfooter");
        return ( loading ?
            <View>
                <ActivityIndicator
                  style={{
                      marginTop:10,
                      alignItems:"center"
                  }}
                  size="large" 
                />
            </View> : null
        )
    }
    
    return (
        <View style={{flex:1}}>
            <View style={{
                padding:5,
                flexDirection:"row",
                justifyContent:"space-around",
                elevation:5,
                backgroundColor:colors.headerColor
            }}>
            <MaterialCommunityIcons
               style={{
                   color:textColor
               }}
               size={32} 
               color="#212121" 
               name={'keyboard-backspace'} 
               onPress={()=>navigation.goBack()}
               />
                <TextInput
                  style={{
                      width:"70%",
                      backgroundColor:"#e6e6e6"
                  }}
                  value={value}
                  onChangeText={(text) => setValue(text)}
                />
                <MaterialCommunityIcons
                  style={{
                      color:textColor
                  }} 
                  size={32} 
                  color="#212121" 
                  name={'send'} 
                  onPress={()=>fetchData()}
                  />
            </View>
            {loading ? <ActivityIndicator style={{marginTop:10}} size="large" color="red" />:null}
            <FlatList
              data={miniCardData}
              renderItem={({item})=>{
                  return <MiniCard
                   videoId={item.id.videoId}
                   title={item.snippet.title}
                   channel={item.snippet.channelTitle}
                  />
              }}
              keyExtractor={item=>item.id.videoId}
              ListFooterComponent={renderFooter}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0}
            />
        </View>
    )
}


export default SearchScreen