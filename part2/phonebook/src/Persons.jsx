import React from "react"

export default function Persons({ results }) {
	return results.map((person, index) => (
		<p key={`person_${index}`}>
			{person.name} {person.number}
		</p>
	))
}
