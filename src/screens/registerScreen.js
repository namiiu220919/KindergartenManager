import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,ToastAndroid, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const RegisterScreen = ({ navigation }) => {
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: 'white' }}>
      <Image
          style={{ width:260,height:100, alignSelf: 'center', marginTop: 80 }}
          source={require('../img/logoAoCuoi.png')}
        />
        <Text style={st.welcome}>Kính chào quý khách !</Text>
        <Text style={{ textAlign: 'center', fontSize: 12, marginBottom: 20 }}>Đăng ký để tiếp tục</Text>
        <TextInput style={st.txtInput} placeholder='Nhập tên đăng nhập'  />
        <TextInput style={st.txtInput} secureTextEntry={true} placeholder='Nhập mật khẩu' />
        <TextInput style={st.txtInput} secureTextEntry={true} placeholder='Nhập lại mật khẩu' />
        <TextInput style={st.txtInput} placeholder='Nhập email' />
        <TouchableOpacity style={st.button}>
          <Text style={st.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
          <Text style={{ color: '#828282', fontWeight: 'bold', fontSize: 12 }}>Đã có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color:'#e29494', fontWeight: 'bold', fontSize: 12 }}> Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const st = StyleSheet.create({
  welcome: {
    textAlign: 'center',
    margin: 15,
    fontWeight: 'bold',
    color: 'black'
  },
  txtInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
    padding: 10
  },
  button: {
    backgroundColor: '#e29494',
    padding: 15,
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
