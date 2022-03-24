

const Navigation = () => {
  return (
    <div>
      <nav className="navbar navbar-dark" style={{backgroundColor:'#e3f2fd'}}>
        <div className="container-fluid">
          <h1>XXX Mangement system</h1>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
        <p>wellcome!</p>
      </nav>
    </div>
  );
}

export default Navigation;
