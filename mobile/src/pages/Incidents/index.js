import React ,{useEffect,useState}from 'react';
import {View, FlatList,Image, Text, TouchableOpacity} from'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import { Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';


export default function Incident() {

    const navagation = useNavigation();

    const [incidents,setIncidents] = useState([]); // Ë uma array pois precisamos de todos os casos
    const [totalIncident,setTotalIncident] = useState(0);
    const [page,setPage] = useState(1)
    const [loading,setLoading] = useState(false)

    function navigationToDetail(incident){
       navagation.navigate('Detail',{incident}); // O segundo paramentro é para ver qual incident o usuario clicou
    }

    async function loadIncidents(){
        
        if(loading){ // se tiver carregando a página nao carregue mais nada
            return;
        }

        if(totalIncident > 0 && incidents.length === totalIncident){ // Carreguei todas as paginas possiveis

            return;
        }

        setLoading(true);

        const response = await api.get('incidents',{
            params: {page} // Passar na url (pro back-end) que pagina estou atualmente
        });
        setIncidents([... incidents, ... response.data]); // Pegar o dados da resposta da api que criamos
        setTotalIncident(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {

        loadIncidents();

    }, [])

    return (
        <View style = {styles.container}>
            <View style = {styles.header}>
                <Image source ={ logoImg}/>
                <Text style = {styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{totalIncident} casos</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e save o dia.</Text>
            <FlatList
                style= {styles.incidentList} 
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2} // So vou atualizar a lista de casos quando tiver faltando 20% da lista atual
                renderItem={({ item: incident }) =>(
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', 
                            {style: 'currency',
                            currency: 'BRL'}).format(incident.value)}
                        </Text>
                    
                        <TouchableOpacity 
                            style = {styles.detailsButton} 
                            onPress={() => navigationToDetail(incident)} // Precisa passar uma função e nao o resultado da função
                        >
                            <Text style={styles.detailsButtonText}> Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color={'#E02041'}/>
                        </TouchableOpacity>
                    </View>
                )} 
            />
        </View>
    )
}
