import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useLocation } from 'react-router-dom';

// Hard-coded arrays; consider fetching from API or passing as props in real use
const suburbs = [
  "Armadale", "Chiawelo", "Chiawelo Extensions", "Comptonville", "Devland", "Devland Extensions", "Dhlamini", "Dhlamini Ext.1 & 2", "Diepkloof Extensions", "Diepkloof Zone 1 – 6", "Dobsonville", "Dobsonville Extensions", "Dobsonville Gardens", "Doornkop", "Doornkop Ext.1", "Dube", "Dube Ext.2", "Emdeni", "Emdeni Ext.1 & 2", "Jabavu", "Jabavu Central Western", "Jabavu Central Western Ext.1", "Jabavu Extensions", "Jabulani", "Klipspruit", "Klipspruit Extensions", "Klipspruit West", "Klipspruit West Ext.1 & 2", "Lenaron", "Lougherin", "Mapetla", "Meadowlands", "Meredale Extensions", "Mofolo Central", "Mofolo North", "Mofolo South", "Mofolo South Ext.1", "Molapo", "Moletsane", "Moroka", "Moroka North", "Naledi", "Naledi Ext.1& .2", "Naturena", "Naturena Extensions", "Noordgesig", "Noordgesig Ext.1", "Orlando", "Orlando East", "Orlando East Ext.1", "Orlando West", "Orlando West Extensions", "Phiri", "Pimville Zone 1 – 9", "Pimville Zone 1 Ext", "Power Park", "Power Park Ext.2 & 3", "Protea City", "Protea Glen", "Protea Glen Extensions", "Protea North", "Protea North Extensions", "Rivasdale", "Senaoane", "Slovoville", "Slovoville Ext.1", "Stesa", "Tladi", "Zola", "Zondi"
];

const substances = [
  "alcohol (🧪)", "dagga (🌿)", "benzene (🛢)", "CAT (💊)", "cocaine (❄)", "heroin (💉)", "ecstasy (🎉)", "inhalants (🔥)", "mandrax (💠)", "hookah pipes (🚬)"
];

interface SocialWorker {
  id: number;
  name: string;
}

// Example hard-coded social workers; in real use, fetch from API or pass as props
const socialWorkers: SocialWorker[] = [
  { id: 1, name: "SW1" },
  { id: 2, name: "SW2" },
  { id: 3, name: "SW3" },
];

interface LocationState {
  userData?: { name?: string; [key: string]: any };
}

const AddClient: React.FC = () => {
  const { state } = useLocation();
  const { userData } = (state || {}) as LocationState;

  const [clientID, setClientID] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientSurname, setClientSurname] = useState<string>('');
  const [clientAge, setClientAge] = useState<string>('');
  const [clientGender, setClientGender] = useState<string>('');
  const [clientRace, setClientRace] = useState<string>('');
  const [clientPhonenumber, setClientPhonenumber] = useState<string>('');
  const [clientAddress, setClientAddress] = useState<string>('');
  const [clientSubstances, setClientSubstances] = useState<string[]>([]);
  const [assignedSwId, setAssignedSwId] = useState<string>('');
  const [nextofKinName, setNextofKinName] = useState<string>('');
  const [nextofKinSurname, setNextofKinSurname] = useState<string>('');
  const [nextofKinRelationship, setNextofKinRelationship] = useState<string>('');
  const [nextofKinPhone, setNextofKinPhone] = useState<string>('');

  const [fileNumber, setFileNumber] = useState<string>('');
  const [clientIDError, setClientIDError] = useState<string>('');
  const [errormessage, setErrorMessage] = useState<string>('');

  // Generate file number based on clientID and clientName
  useEffect(() => {
    if (clientID.length >= 3 && clientName.trim().split(' ').length >= 2) {
      const parts = clientName.trim().split(' ');
      const generated =
        clientID.substring(0, 3) +
        parts[1].substring(0, 2).toUpperCase() +
        parts[0].substring(0, 2).toUpperCase();
      setFileNumber(generated);
    } else {
      setFileNumber('');
    }
  }, [clientID, clientName]);

  // Validate ID: exactly 13 digits
  const validateID = (id: string): boolean => {
    if (!/^\d{13}$/.test(id.trim())) {
      setClientIDError('ID number must be exactly 13 digits.');
      return false;
    }
    setClientIDError('');
    return true;
  };

  const handleSubstanceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(opt => opt.value);
    setClientSubstances(selectedOptions);
  };

  const handleClientSubmit = async (e: FormEvent<HTMLFormElement>) => {
   
   

    
  };

  return (
    <div className="add-client-container">
      <h2>Add Client{userData?.name ? ` for ${userData.name}` : ''}</h2>
      <form onSubmit={handleClientSubmit}>
        <input
          type="text"
          placeholder="ID Number"
          value={clientID}
          onChange={e => setClientID(e.target.value)}
          required
        />
        {clientIDError && <small className="error-message">{clientIDError}</small>}

        <input
          type="text"
          placeholder="First Name"
          value={clientName}
          onChange={e => setClientName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Surname"
          value={clientSurname}
          onChange={e => setClientSurname(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Age"
          value={clientAge}
          onChange={e => setClientAge(e.target.value)}
          required
        />

        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          required
          onChange={e => setClientGender(e.target.value)}
          value={clientGender}
        >
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="race">Race:</label>
        <select
          id="race"
          required
          onChange={e => setClientRace(e.target.value)}
          value={clientRace}
        >
          <option value="" disabled>Select Race</option>
          <option value="Black">Black</option>
          <option value="Coloured">Coloured</option>
          <option value="White">White</option>
          <option value="Indian">Indian</option>
        </select>

        <input
          type="tel"
          placeholder="Phone Number (optional)"
          value={clientPhonenumber}
          onChange={e => setClientPhonenumber(e.target.value)}
        />

        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          placeholder="Enter address or select suburb..."
          value={clientAddress}
          onChange={e => setClientAddress(e.target.value)}
          required
        />

        <div>
          <label htmlFor="substances">Substances Used (hold Ctrl/Cmd for multiple):</label>
          <select
            id="substances"
            multiple
            required
            onChange={handleSubstanceChange}
            value={clientSubstances}
            size={Math.min(substances.length, 5)}
          >
            {substances.map((substance, idx) => (
              <option key={idx} value={substance}>
                {substance}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="assignedWorker">Assign to Social Worker:</label>
        <select
          id="assignedWorker"
          required
          onChange={e => setAssignedSwId(e.target.value)}
          value={assignedSwId}
        >
          <option value="">-- Select Social Worker --</option>
          {socialWorkers.map(worker => (
            <option key={worker.id} value={String(worker.id)}>
              {worker.name}
            </option>
          ))}
        </select>

        <h3>Next of Kin</h3>
        <input
          type="text"
          placeholder="Name"
          value={nextofKinName}
          onChange={e => setNextofKinName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Surname"
          value={nextofKinSurname}
          onChange={e => setNextofKinSurname(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Relationship"
          value={nextofKinRelationship}
          onChange={e => setNextofKinRelationship(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={nextofKinPhone}
          onChange={e => setNextofKinPhone(e.target.value)}
          required
        />

        <p>Generated File Number: <span>{fileNumber}</span></p>
        <button type="submit">Add Client</button>
        {errormessage && <div className="error-message">{errormessage}</div>}
      </form>
    </div>
  );
};

export default AddClient;
