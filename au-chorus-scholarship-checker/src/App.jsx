import { useState, useEffect } from 'react'; // Import useEffect
import chorusLogo from './assets/au-chorus-logo.jpg';
import dataMember from './member.json';
import './App.css';

function App() {
  const [studentID, setStudentID] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const member = dataMember.find((m) => m["Student ID"] === Number(studentID));

    if (member) {
      const data = (
        <tr key={member["Student ID"]}>
          <td>{member["Student ID"]}</td>
          <td>{member.Nickname}</td>
          <td>{member.Scholarship}</td>
          <td>{member["Scholarship Hours"]}</td>
        </tr>
      );

      let additionalMessage = '';

      if (member.Scholarship === 'Yes') {
        if (!member['Wai Kru'] && !member['King Rama X'] && !member['Virgin Mary']) {
          additionalMessage = (
            <span style={{ color: 'red' }}>
              To receive scholarship hours, you must participate in at least one event (Wai Kru, King Rama X, Virgin Mary, or Albert Prize).
            </span>
          );
        }
      }

      setResult({ data, additionalMessage });
    } else {
      setResult('Student not found');
    }
  }

  return (
    <>
      <div>
        <img src={chorusLogo} alt="AU CHORUS logo" />
      </div>
      <div className="card">
        <h3>Scholarship Hours Checker</h3>
        <label htmlFor="studentID">Enter your student ID</label>
        <form onSubmit={handleSearch} class="d-flex justify-content-center">
          <input
            type="text" 
            id='studentID' 
            name='studentID'
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
            class="mr-2"
          />
          <button type='submit' class="btn btn-primary">Search</button>
        </form>
        
        <p>From 10 June - 8 August 2024</p>
        {result && typeof result === 'object' && (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nickname</th>
                <th>Scholarship (Y/N)</th>
                <th>Scholarship Hours</th>
              </tr>
            </thead>
            
            <tbody>
              {result.data}
            </tbody>
          </table>
        )}
        {result && typeof result === 'object' && result.additionalMessage && (
          <p>{result.additionalMessage}</p>
        )}
        {result && typeof result === 'string' && <p>{result}</p>}
      </div>

      <div class="list-container mt-5">
        <h5><strong>Scholarship Hours Providing Criteria</strong></h5>
        <ul class="list-unstyled">
          <li><p>Scholarship hours can be gained by attending the rehearsals AND events according to the schedule.</p></li>
          <li><p>The number of scholarship hours will be counted only when they come to rehearsal AND participate in the event which will depend on actual hours attended and overall events in each semester.</p></li>
          <li><p>The scholarship hours will be counted and shown after all events are finished in each semester. The secretary will announce the number of scholarship hours each member earned before the final exam period.</p></li>
          <li><p>The total of scholarship hours will be sent to the administrative office before the final exam. Thus, the scholarship that you received from AUC will not be shown in AU Spark right away.</p></li>
        </ul>
      </div>

      <div class="mt-5">
        <p className="read-the-docs">
          <ul class="list-unstyled">
            <li>For More Information Contact:</li>
            <li>(Yumi) Line: may12y2021 Phone no: 081-007-4395</li>
            <li>(Tey) Line: vatt3yy Phone no: 083-820-4303</li>
          </ul>
        </p>
      </div>  
      
    </>
  );
}

export default App;
