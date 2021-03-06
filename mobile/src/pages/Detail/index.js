import React from 'react';
import {View, FlatList,Image, Text, TouchableOpacity,Linking} from'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import { Feather} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
import api from '../../services/api';


export default function Detail() {

    const navigation = useNavigation();  // Consegui voltar de página
    const  route = useRoute();         // Pegar o parametro da funçao que foi passada
    const  incident = route.params.incident; // Pega que incidente eu preciso mostrar o detalhe

    const mensagem = `Olá ${incident.name}, estou entrando em contato pois, gostaria de ajuda no caso ${incident.title} com o valor de  ${Intl.NumberFormat('pt-BR', 
    {style: 'currency',
    currency: 'BRL'}).format(incident.value)}`;


    function navigateBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Heroi do caso: ${incident.title}`,
            body: mensagem,
            recipients: [incident.email]
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${mensagem}`);
    }

    return (
        <View style= {styles.container}>
            <View style = {styles.header}>
                <Image source ={ logoImg}/>
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name='arrow-left' size={28} color={'#E02041'} />
                </TouchableOpacity>
            </View>
            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat('pt-BR', 
                    {style: 'currency',
                    currency: 'BRL'}).format(incident.value)}
                </Text>
            </View>
            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o heroi desse caso</Text>
                <Text style={styles.heroDescription}>Entre em contato:</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style ={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style ={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
 