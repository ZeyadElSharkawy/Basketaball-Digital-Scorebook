import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Countdown from '../../Components/Countdonw/Countdown'
import apiRequest from '../../helper/api'
import './Startmatch.css'

const Startmatch = () => {
    let {homeID, awayID} = useParams();
    let [teamNameH, setTeamNameH] = useState("");
    let [teamManagerH, setTeamManagerH] = useState("");
    let [teamNameA, setTeamNameA] = useState("");
    let [teamManagerA, setTeamManagerA] = useState("");
    let [id, setId] = useState(0);
    let [imagefileH, setimagefileH]= useState("");
    let [imagefileA, setimagefileA]= useState("");
    let [refresh, setRefresh] = useState(false);
    let [playersH, setPlayersH] = useState([]);
    let [playersA, setPlayersA] = useState([]);
    let [selectedPlayer, setSelectedPlayer] = useState([]);



    useEffect(function(){
        if(id || homeID){
            console.log(homeID, awayID);
            apiRequest({
                route:"getTeam",
                method:"POST",
                body:{team_id: homeID },
                onReturn:(result)=>{
                    console.log(result);
                    let team = result[0];
                    setTeamManagerH(team.manager);
                    setTeamNameH(team.team_name);
                    setimagefileH(team.team_logo);
                }
            })
            
        }

        if(id || awayID){
            console.log(homeID, awayID);
            apiRequest({
                route:"getTeam",
                method:"POST",
                body:{team_id: awayID },
                onReturn:(result)=>{
                    console.log(result);
                    let team = result[0];
                    setTeamManagerA(team.manager);
                    setTeamNameA(team.team_name);
                    setimagefileA(team.team_logo);
                }
            })
            
        }
    },[]);

    useEffect(function (){
        if(id || homeID){
            apiRequest({
                route: "getPlayer",
                method: "POST",
                body:{team_id: homeID},
                onReturn:(data)=>{
                  setPlayersH(data);
                }
            });
        } 
        if(id || awayID){
            apiRequest({
                route: "getPlayer",
                method: "POST",
                body:{team_id: awayID},
                onReturn:(data)=>{
                  setPlayersA(data);
                }
            });
        } 

      }, [refresh]);

    const [score1, setscore1]= useState(0);
    const [score2, setscore2]= useState(0);

    const add1_1 = () => {
        setscore1(score1+1);
    }
    const add2_1 = () => {
        setscore1(score1+2);
    }
    const add3_1 = () => {
        setscore1(score1+3);
    }

    const add1_2 = () => {
        setscore2(score2+1);
    }
    const add2_2 = () => {
        setscore2(score2+2);
    }
    const add3_2 = () => {
        setscore2(score2+3);
    }

    function sendPlayerStats(key, incrementBy){
        if(selectedPlayer || selectedPlayer != {}){
            apiRequest({
                route:"playerStats",
                method: "POST",
                body:{
                    field: key,
                    value: parseInt(selectedPlayer[key]) + incrementBy,
                    player_id: selectedPlayer.player_id
                },
                onReturn:function(){
                    setRefresh((prev) => !prev);
                    setSelectedPlayer({});
                }
            });
        }  
    }

   
  return (
    <div className='main-backdrop'>
        <div className='main-container'>
                <div className='title-time'>
                    <h1 className='page-title'>Match</h1>
                    <button className='start-btn'>Start</button>
                    <div className='teams-countdown-container'>
                        <div className='team1'>
                        <img className='team1-logo'src={"http://localhost:3000/"+imagefileH} ></img>
                        <h3>{teamNameH}</h3>
                    </div>
                    <div className='team1-score'>
                        <p className='score'>{score1}</p>
                        <div className='points-teams'>
                                <h4 className='points-title'>points: </h4>
                                <button className='add1' onClick={add1_1}>1</button>
                                <button className='add2' onClick={add2_1}>2</button>
                                <button className='add3' onClick={add3_1}>3</button>
                        </div>
                    </div>
                    <p id='countdown' className='countdown' ><Countdown /></p>
                    <div className='team2-score'>
                        <p className='score'>{score2}</p>
                        <div className='points-teams'>
                                <h4 className='points-title'>points: </h4>
                                <button className='add1' onClick={add1_2}>1</button>
                                <button className='add2' onClick={add2_2}>2</button>
                                <button className='add3' onClick={add3_2}>3</button>
                        </div>
                    </div>
                     <div className='team2'>
                        <img className='team2-logo' src={"http://localhost:3000/"+imagefileA}></img>
                        <h3>{teamNameA}</h3>
                    </div>
                </div>
                <div className='players-stats'>
                       
                    <div className='subs-lineup-container'>
                        <table>
                            <tr>
                                <td>Name</td>
                                <td>Shirt #</td>
                                <td></td>
                            </tr>
                        {playersH ? playersH.map(
                            function(player){
                                console.log(player);
                                return(
                                    <tr>
                                        <td>{player.player_name}</td>
                                        <td>{player.shirt_no}</td>
                                        <td><button onClick={function(){
                                            setSelectedPlayer(player);
                                        }}>{selectedPlayer.player_id == player.player_id ? "Unselect Player" : "Select Player"}</button></td>
                                    </tr>
                                )
                            }

                            ) : <></>}
                            
                        </table>
                        </div>
                    <div className='stats-container'>
                        <div className='stats-board'>
                            <div>
                                <button className='points'>points</button>
                                <button className='add1' onClick={()=>{sendPlayerStats("points", 1)}}>+1</button>
                                <button className='add2' onClick={()=>{sendPlayerStats("points", 2)}}>+2</button>
                                <button className='add3' onClick={()=>{sendPlayerStats("points", 3)}}>+3</button>
                            </div>
                            <button className='assist' onClick={()=>{sendPlayerStats("assist", 1)}}>Assist</button>
                            <button className='Block' onClick={()=>{sendPlayerStats("block", 1)}}>Block</button>
                            <button className='Rebound' onClick={()=>{sendPlayerStats("rebound", 1)}}>Rebound</button>
                            <button className='steal'>Steal</button>
                        </div>
                    </div>
                    <div className='players-team2'>
                        <div className='subs-lineup-container2'>
                        <table>
                            <tr>
                                <td>Name</td>
                                <td>Shirt #</td>
                                <td></td>
                            </tr>
                            {playersA ? playersA.map(
                            function(player){
                                console.log(player);
                                return(
                                    <tr>
                                        <td>{player.player_name}</td>
                                        <td>{player.shirt_no}</td>
                                        <td><button onClick={function(){
                                            setSelectedPlayer(player);
                                        }}>{selectedPlayer.player_id == player.player_id ? "Unselect Player" : "Select Player"}</button></td>
                                    </tr>
                                )
                            }

                            ) : <></>}
                        </table>
                        </div>
                    </div>

                </div>
            
            </div>
        </div>

    </div>
  )
}

export default Startmatch