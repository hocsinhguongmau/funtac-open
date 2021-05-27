import React, { useState, useEffect } from "react"
import axios from "axios"

const App = () => {
	const [countries, setCountries] = useState([])
	const [results, setResults] = useState([])
	useEffect(() => {
		axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
			setCountries(response.data)
			console.log(response.data)
		})
	}, [])
	const handleFilter = (event) => {
		const searchString = event.target.value.toLowerCase().split(" ")
		const filterCountries = countries.filter((country) => {
			let containsAtLeastOneWord = false
			searchString.forEach((word) => {
				if (country.name.toLowerCase().includes(word))
					containsAtLeastOneWord = true
			})
			if (containsAtLeastOneWord) {
				return country
			} else {
				return null
			}
		})
		setResults(filterCountries)
	}

	return (
		<div>
			<h2>Countries</h2>
			<p>
				filter shown with <input type='text' onChange={handleFilter} />
			</p>
			{results.length <= 10 ? (
				results.length === 1 ? (
					results.map((country, index) => (
						<div key={`country_details_${index}`}>
							<p>{country.name}</p>
							<p>Capital {country.capital}</p>
							<p>Population {country.population}</p>
							<p>Languages</p>
							<ul>
								{country.languages.map((language) => (
									<li key={`language_${language}`}>
										{language.name}
									</li>
								))}
							</ul>
							<p>
								<img src={country.flag} width={150} />
							</p>
						</div>
					))
				) : (
					results.map((country, index) => (
						<p key={`country_${index}`}>{country.name}</p>
					))
				)
			) : (
				<p>Too many matches, specify another filter</p>
			)}
		</div>
	)
}

export default App
