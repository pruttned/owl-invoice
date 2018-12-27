import React, { Component } from 'react';
import ItemList from '../../../common/item-list';
import { TextField } from '@material-ui/core';
import styles from './client-form.module.scss';
import { Client } from '../client';
import Avatar from '../../../common/avatar/avatar';

interface ClientFormProps {
    client: Client
}

// interface ClientFormState {
//     client: Client
// }

class ClientForm extends Component<ClientFormProps, Client> {
    constructor(props: ClientFormProps) {
        super(props);
        this.state = { ...props.client };

        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
              const target = event.target;
              const value = target.value;
              const name = target.name;

              this.setState({
                [name]: value
              });
    }

    render() {
        return (
            <form>
                <TextField label="Name" value={this.state.name} onChange={this.handleChange} />
                <TextField label="Address" value={this.state.address} onChange={this.handleChange} />
            </form>
        );
    }
}

export default ClientForm;



// class Reservation extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         isGoing: true,
//         numberOfGuests: 2
//       };

//       this.handleInputChange = this.handleInputChange.bind(this);
//     }

//     handleInputChange(event) {
//       const target = event.target;
//       const value = target.type === 'checkbox' ? target.checked : target.value;
//       const name = target.name;

//       this.setState({
//         [name]: value
//       });
//     }

//     render() {
//       return (
//         <form>
//           <label>
//             Is going:
//             <input
//               name="isGoing"
//               type="checkbox"
//               checked={this.state.isGoing}
//               onChange={this.handleInputChange} />
//           </label>
//           <br />
//           <label>
//             Number of guests:
//             <input
//               name="numberOfGuests"
//               type="number"
//               value={this.state.numberOfGuests}
//               onChange={this.handleInputChange} />
//           </label>
//         </form>
//       );
//     }
//   }