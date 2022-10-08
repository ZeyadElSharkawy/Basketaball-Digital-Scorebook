import React, { useEffect, useState } from 'react'
import './Teams.css'
import {Link, useNavigate} from "react-router-dom";
import apiRequest from "../../helper/api";

const Teams = () => {
  let navigate = useNavigate();
  let [data, setData] = useState([]);
  let [refresh, setRefresh] = useState(false);
  let [isChoosen, setisChoosen] = useState([]);
  let [selectedTeams, setSelectedTeams] = useState([]);

  useEffect(function (){
    apiRequest({
      route: "getTeams",
      method: "POST",
      onReturn:(data)=>{
        setData(data);
        let choosen = [];
        for(let row of data){
          choosen.push(false);
        }
        setisChoosen(choosen);
      }
    });
  }, [refresh]);


function deleteitem (id) {
  apiRequest({
    route:"deleteteam",
    method:"POST",
    body:{team_id: id},
    onReturn: function(){
      setRefresh((prev) => {
        return !prev;
      });
    }
  });
}

console.log(selectedTeams);


  return (
    <div>
        <div className="teams-header spaced-children">
            <h1>Teams List</h1>
            <div>
            <button className='Team_addbtn' onClick={function () {
              if(selectedTeams.length != 2){
                alert("Must Select Exactly Two Teams");
                return;
              }
              navigate("/start/" +selectedTeams[0].team_id + "/" + selectedTeams[1].team_id );
              }} >Start Match</button>
              <button className='Team_createbtn' onClick={function (){ navigate("/create");}}>Create Team</button>
            </div>
            
        </div>
        <div className="teams-list">
        <table className="teams-table">
          {data ? data.map(function(team, index){
            return (<tr className="team">
            <td><img className="team-image" src={"http://localhost:3000/"+team.team_logo}/></td>
            <td><div className='team-title'>{team.team_name}</div></td>
            <td><div className='team-title'>Managed By: {team.manager}</div></td>
            <td className="team-buttons">
              <button className='edit-btn' onClick={function (){ navigate("/create/"+team.team_id);}} >Edit</button>
              <button className='delete-btn' onClick={ () => deleteitem(team.team_id)} >Delete</button>
              <button className='Team_addbtn' onClick={function () {
                let newChoosenArr = isChoosen.concat([]);
                if(selectedTeams.length < 2){
                  newChoosenArr[index] = !newChoosenArr[index];
                  setisChoosen(newChoosenArr);
                  setSelectedTeams([...selectedTeams, team]);
                }else if(newChoosenArr[index]){
                  newChoosenArr[index] = false;
                  setisChoosen(newChoosenArr);
                  setSelectedTeams(selectedTeams.filter(function(element){
                    return element.team_id != team.team_id;
                  }));
                }
                
              }} >{isChoosen[index] ? "Unselect Team ": "Select Team"}</button>
            </td>
          </tr>);
          }) : <></>} 
        </table>
        </div>
    </div>
  )
}

export default Teams