import { Button,TouchableOpacity, StyleSheet, Text, TextInput, View, Image, StatusBar, Alert, ImageBackground } from 'react-native'
import React, {useState} from 'react';
//hehehehehehe

const LoginScreen = ({navigation}) => {
  return (
    <ImageBackground source={require('../img/background.png')}>
      <View style={st.container}>
      <StatusBar barStyle="light-content"/>
      <Image
        style={{ width:260,height:100,alignSelf:'center'}}
        source={require('../img/logoAoCuoi.png')}
      />
      <Text style={st.welcome}>Kính chào quý khách !</Text>
      <Text style={{textAlign:'center',fontSize: 12, marginBottom: 20}}>Đăng nhập để tiếp tục</Text>
      <TextInput style={st.txtInput} placeholder='Tên đăng nhập' ></TextInput>
      <TextInput style={st.txtInput} secureTextEntry={true} placeholder='Mật khẩu' ></TextInput>
      <TouchableOpacity style={st.button} >
        <Text style={st.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity style={st.button1}>
        <Text style={st.buttonText1}>Đăng nhập với Google</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', justifyContent: 'center',marginTop:30}}>
          <Text style={{color: '#828282', fontWeight: 'bold', fontSize: 12}}>
            Chưa có tài khoản?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{color: '#e29494', fontWeight: 'bold', fontSize: 12}}> Đăng ký</Text>
          </TouchableOpacity>
        </View>
      <View style={{flexDirection: 'row', justifyContent: 'center',marginTop:30}}>
          <Text style={{color: '#828282', fontWeight: 'bold', fontSize: 12}}>
            Quên mật khẩu?
          </Text>
          <TouchableOpacity >
            <Text style={{color: '#e29494', fontWeight: 'bold', fontSize: 12}}> Đặt lại</Text>
          </TouchableOpacity>
        </View>
    </View>
    </ImageBackground>
  )
}

export default LoginScreen

const st = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%',
    justifyContent:'center',
    textAlign:'center',
  },
  logo: {
    width:400,
    height: 400
  },
  welcome: {
    textAlign:'center',
    margin: 15,
    fontWeight: 'bold',
    color: 'black'
  },
  txtInput: {
    borderWidth:1,
    borderColor: 'black',
    borderRadius: 8,
    marginTop: 12 ,
    marginLeft:12,
    marginRight: 12,
    padding:10
  },
  
  button: {
    backgroundColor: '#e29494', 
    padding: 15,
    marginTop: 12 ,
    marginLeft:12,
    marginRight: 12,
    borderRadius: 12,
  },
  button1: {
    backgroundColor: 'white', 
    padding: 15,
    marginTop: 12 ,
    marginLeft:12,
    marginRight: 12,
    borderWidth:1,
    borderColor:'black',
    borderRadius: 12,
  },
  button2: {
    textAlign: 'center',
    alignContent: 'center',
    fontSize: 12,
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    textAlign:'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonText1: {
    color: 'black',
    textAlign:'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonText2: {
    color: '#FACF23',
    fontSize: 14,
    fontWeight: 'bold',
  },




})