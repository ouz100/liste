class App extends React.Component {
  state = {
    students: [],
    editStudentId: null,
    studentToEdit: null
  };

  addStudent = (student) => {
    student.id = this.state.students.length + 1;
    this.setState({
      students: [...this.state.students, student],
      editStudentId: null,
      studentToEdit: null
    });
  };

  editStudent = (student) => {
    this.setState({
      editStudentId: student.id,
      studentToEdit: student
    });
  };

  updateStudent = (updatedStudent) => {
    this.setState((prevState) => ({
      students: prevState.students.map(student =>
        student.id === updatedStudent.id ? updatedStudent : student
      ),
      editStudentId: null,
      studentToEdit: null
    }));
  };

  deleteStudent = (id) => {
    this.setState((prevState) => ({
      students: prevState.students.filter(student => student.id !== id)
    }));
  };

  render() {
    return (
      <div className="App">
        <h2 className="text-center mb-4">Jeemacoder gestion utilisateurs</h2>
        <div className="col-md-6 mx-auto">
          <AddStudentForm
            addStudent={this.addStudent}
            studentToEdit={this.state.studentToEdit}
            updateStudent={this.updateStudent}
          />
        </div>
        <StudentTable
          students={this.state.students}
          editStudent={this.editStudent}
          deleteStudent={this.deleteStudent}
        />
      </div>
    );
  }
}

class AddStudentForm extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  componentDidUpdate(prevProps) {
    if (this.props.studentToEdit !== prevProps.studentToEdit) {
      const { firstName, lastName, email, phone } = this.props.studentToEdit || {};
      this.setState({
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        phone: phone || ''
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone } = this.state;
    if (firstName && lastName && email && phone) {
      if (this.props.studentToEdit) {
        this.props.updateStudent({ ...this.props.studentToEdit, firstName, lastName, email, phone });
      } else {
        this.props.addStudent(this.state);
      }
      this.setState({ firstName: '', lastName: '', email: '', phone: '' });
    } else {
      alert('Veuillez remplir tous les champs');
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="mb-4">
        <div className="form-row">
          <div className="form-group col-md-6">
            <input type="text" id="firstName" className="form-control" onChange={this.handleChange} value={this.state.firstName} placeholder="Prénom" />
          </div>
          <div className="form-group col-md-6">
            <input type="text" id="lastName" className="form-control" onChange={this.handleChange} value={this.state.lastName} placeholder="Nom" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <input type="email" id="email" className="form-control" onChange={this.handleChange} value={this.state.email} placeholder="Email" />
          </div>
          <div className="form-group col-md-6">
            <input type="tel" id="phone" className="form-control" onChange={this.handleChange} value={this.state.phone} placeholder="Téléphone" />
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-block">
            {this.props.studentToEdit ? 'Modifier étudiant' : 'Ajouter étudiant'}
          </button>
        </div> 
      </form>
    );
  }
}

const StudentTable = ({ students, editStudent, deleteStudent }) => {
  return (
    <div>
      <h2 className="mb-3">Liste des étudiants</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>
                <button className="btn btn-warning btn-sm mr-2" onClick={() => editStudent(student)}>Modifier</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteStudent(student.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));