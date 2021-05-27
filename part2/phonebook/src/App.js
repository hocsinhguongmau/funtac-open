import React, { useState, useEffect } from "react"
import axios from "axios"
import Persons from "./Persons"
import Form from "./Form"
import Filter from "./Filter"

const App = () => {
	const [persons, setPersons] = useState([])
	const [results, setResults] = useState([])
	const [newName, setNewName] = useState("")
	const [newNumber, setNewNumber] = useState("")

	useEffect(() => {
		axios.get("http://localhost:3001/persons").then((response) => {
			setPersons(response.data)
			setResults(response.data)
		})
	}, [])
	const handleSubmit = (event) => {
		event.preventDefault()

		if (results.find((person) => person.name === newName)) {
			alert(`${newName} is already added to phonebook`)
		} else {
			setPersons([...persons, { name: newName, number: newNumber }])
			setResults([...persons, { name: newName, number: newNumber }])
		}
	}
	const handleChangeName = (event) => {
		setNewName(event.target.value)
	}
	const handleChangeNumber = (event) => {
		setNewNumber(event.target.value)
	}
	const handleFilter = (event) => {
		const searchString = event.target.value.toLowerCase().split(" ")
		const filterPersons = persons.filter((person) => {
			let containsAtLeastOneWord = false
			searchString.forEach((word) => {
				if (person.name.toLowerCase().includes(word))
					containsAtLeastOneWord = true
			})
			if (containsAtLeastOneWord) {
				return person
			} else {
				return null
			}
		})
		setResults(filterPersons)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter handleFilter={handleFilter} />
			<Form
				handleChangeName={handleChangeName}
				handleSubmit={handleSubmit}
				handleChangeNumber={handleChangeNumber}
			/>
			<Persons results={results} />
		</div>
	)
}

export default App
