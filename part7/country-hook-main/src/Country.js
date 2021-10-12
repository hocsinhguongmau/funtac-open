export const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h2>{country.name} </h2>
      <div>
        <p>Capital {country.capital}</p>
        <p>Population {country.population}</p>
        <p>Languages</p>
        <ul>
          {country.languages.map((language, index) => (
            <li key={`language_${index}`}>{language.name}</li>
          ))}
        </ul>
        <p>
          <img src={country.flag} width={150} alt={country.name} />
        </p>
      </div>
    </div>
  )
}
