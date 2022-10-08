import React, {useEffect, useRef, useState} from 'react'
import { useParams } from 'react-router-dom';
import apiRequest from '../../helper/api';
import './Create.css'

const Create = () => {
    let fileInputRef = useRef();
    let {routeID} = useParams();
    let [imageFile, setImageFile] = useState("");
    let [imageExt, setImageExt] = useState("");
    let [id, setId] = useState(0);
    let [teamName, setTeamName] = useState("");
    let [teamManager, setTeamManager] = useState("")
    let [playerName, setPlayer_name]= useState("")
    let [age, setage] = useState("")
    let [height, setheight] = useState("")
    let [shirtNo, setshirtNO] = useState("")
    let [refresh, setRefresh] = useState(false);
    let [players, setPlayers] = useState([]);

    useEffect(function (){
        if(id || routeID){
            apiRequest({
                route: "getPlayer",
                method: "POST",
                body:{team_id: routeID ? routeID : id},
                onReturn:(data)=>{
                  setPlayers(data);
                }
            });
        }   
      }, [refresh]);
    

    useEffect(function(){
        console.log(routeID)
        if(routeID){
            setId(routeID);
            apiRequest({
                route: "getTeam",
                method: "POST",
                body:{
                    team_id: routeID
                },
                onReturn:(result)=>{
                    let team = result[0];
                    setTeamManager(team.manager);
                    setTeamName(team.team_name);
                }
            })
        }
    },[]);

    function createTeam(){
        apiRequest({
            route: "teams",
            method:"POST",
            body:{
                team_name: teamName,
                team_manager: teamManager,
                image_extension: imageExt,
                team_image: imageFile
            },
            onReturn:function(data){
                setId(data.insertId);
            }
        })
    }

    function createPlayer(){
        apiRequest({
            route: "player",
            method:"POST",
            body:{
                player_name: playerName,
                age: age,
                height: height,
                shirt_no: shirtNo,
                team_id: id
            },
            onReturn:function(data){
                setRefresh((prev) => {return !prev});
                setPlayer_name("");
                setage(0);
                setheight(0);
                setshirtNO(0);
            }
        })
    }
    
    function deleteplayer (id) {
        apiRequest({
          route:"deleteplayer",
          method:"POST",
          body:{player_id: id},
          onReturn: function(){
            setRefresh((prev) => {
              return !prev;
            });
          }
        });
      }









  return (
    <div className='Team-Create-Container'>
    <div className='Team-Create'> 
        <h1 className='page-title'>Add Team</h1>
        <div>
            <div className='team-info'>
                <div className='Add-image-container'>
                    <input onChange={function(event){
                        let reader = new FileReader();
                        setImageExt(event.target.files[0].name.split(".")[1])
                        reader.addEventListener('load', function( evt ) {
                            setImageFile(reader.result);
                        });
                        reader.readAsDataURL(event.target.files[0]);
                    }} ref={fileInputRef} style={{display:'none', visibility:"hidden"}} type="file" />
                    { imageFile 
                    ? 
                    <img className='image-input' src={imageFile} />
                    : <button onClick={function (){
                        fileInputRef.current.click();
                    }} className="image-btn"></button>}
                </div>
                <div className="team-info-input-cont">
                <input type='text' className='team-name' placeholder='Team name' value={teamName} onChange={(event)=>setTeamName(event.target.value)}/>
                <input type='text' className='team-name' placeholder='Team Manager' value={teamManager} onChange={(event)=>setTeamManager(event.target.value)}/>
                <button className='createT-btn' onClick={createTeam}>Create Team</button>
                </div>
            </div>
            {id ? <div className='player-container'>
                <h1 className='player-heading'>Players</h1>
            <div className='player'>
                <table className='registered'>
                    <tr className='row'>
                        <td className='cell'>Name</td>
                        <td className='cell'>Shirt #</td>
                    </tr>
                    {players.map(
                        function(player){
                            return (
                            <tr className='row'>
                                <td className='cell'>{player.player_name}</td>
                                <td className='cell'>{player.shirt_no}</td>
                                <td className='delete-container2'>
                                    <button className='delete-btn2' onClick={ () => deleteplayer(player.player_id)} ></button>
                                </td>
                            </tr>
                            );
                    })}
                </table>
                <div className='player-info'>
                    <h3 className='Add-player-title'>Add Player</h3>
                    <input type='text' placeholder='Name' className='input-player' value={playerName} onChange={(event)=>setPlayer_name(event.target.value)}/>
                    <input type='number' placeholder='Age' className='input-player' value={age} onChange={(event)=>setage(event.target.value)}/>
                    <input type='number' placeholder='height' className='input-player'value={height} onChange={(event)=>setheight(event.target.value)}/>
                    <input type='number' placeholder='Shirt #' className='input-player' value={shirtNo} onChange={(event)=>setshirtNO(event.target.value)}/>
                    <button className='done-player'  onClick={createPlayer}>Done</button>
                </div>
            </div>
            </div> : <></>}
           

            
        </div>
    </div>
    </div>
  )
}

export default Create