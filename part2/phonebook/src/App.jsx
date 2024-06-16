import React, { useState, useEffect } from "react";
import personsService from "./services/persons";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import Notification from "./components/Notification.jsx";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSearch(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const changedPerson = { ...existingPerson, number: newNumber };
        personsService
          .update(existingPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) => (person.id !== existingPerson.id ? person : returnedPerson))
            );
            setNotificationMessage(`Updated ${returnedPerson.name}`);
            setNotificationType("success");
            setTimeout(() => {
              setNotificationMessage(null);
              setNotificationType(null);
            }, 5000);
          })
          .catch((error) => {
            setNotificationMessage(
              `Information of ${existingPerson.name} has already been removed from the server`
            );
            setNotificationType("error");
            setTimeout(() => {
              setNotificationMessage(null);
              setNotificationType(null);
            }, 5000);
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
          });
      }
    } else {
      personsService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNotificationMessage(`Added ${returnedPerson.name}`);
        setNotificationType("success");
        setTimeout(() => {
          setNotificationMessage(null);
          setNotificationType(null);
        }, 5000);
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          setNotificationMessage(`Deleted ${person.name}`);
          setNotificationType("success");
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setNotificationMessage(
            `Information of ${person.name} has already been removed from server`
          );
          setNotificationType("error");
          setPersons(persons.filter((p) => p.id !== id));
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
  };

  const personsToShow = search
    ? persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
      <Filter search={search} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <Form
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
