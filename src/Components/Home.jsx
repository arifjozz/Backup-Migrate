import React, { Component } from 'react'
import axios from 'axios';
import { Card, Icon, Image, Button, } from 'semantic-ui-react'


export default class Home extends Component {
    state = {
        data : [],
        nama : '',
        umur : 0,
        gambar : "",
        idbu : "",
        buttonog : false,
      }
    
      componentDidMount(){
        this.getData()
      }
      
      getData = () => {
        axios.get('http://localhost:8000/api/list')
        .then(response => {
          console.log(response);
          this.setState({
            data : response.data,
            loadingbae : true
          })
        })
      }
    
    
      kirimData = () => {
        axios.post('http://localhost:8000/api/list', 
        {
          nama : this.state.nama,
          umur : this.state.umur,
          gambar  : this.state.gambar
        }
      )
      .then(response =>{
        alert('hore')
        this.setState({
          nama : "",
          umur : 0,
          gambar : ''
        })
        this.getData()
      })
      }
      
      gantiData = _id =>{
        axios.put(`http://localhost:8000/api/list/${_id}`,
        {
            nama : this.state.nama,
            umur : this.state.umur,
            gambar : this.state.gambar
        }).then(res => {
          this.setState({
            nama : "",
            umur : 0,
            gambar  : '',
            buttonog : false
          })
          console.log(res);
          this.getData();
        })
      }
    
    //   deleteData = (_id) => {
    //   axios.delete(`http://localhost:8000/api/list/${_id}`).then(res => {
    //     this.getData();
    //   })
    // }
    // }
    deleteData = (_id) => {
      axios.delete(`http://localhost:8000/api/list/${_id}`).then(res => {
        this.getData();
      })
    }
    
      handleChange = e =>{
        this.setState({
          [e.target.name] : e.target.value
        }) 
        console.log(this.state.nama);
        console.log(this.state.umur)
      }
    
      getDataEdit = _id => {
        axios.get(`http://localhost:8000/api/list/${_id}`).then(res => {
          console.log(res.data, "ini dataaaa");
          this.setState({
            nama: res.data[0].nama,
            umur: res.data[0].umur,
            gambar : res.data[0].gambar,
            buttonog : true,
            idbu : res.data[0]._id
          });
        });
      };
    
    
      render()
      {
        return (
          <div>
    
              <input name="nama" onChange={this.handleChange} value={this.state.nama} placeholder="Nama" />
              <input name="umur" type="number" onChange={this.handleChange} value={this.state.umur} placeholder="Usia" />
              <input name="gambar" onChange={this.handleChange} value={this.state.gambar} placeholder="URL Gambar" />
              
              {this.state.buttonog ? (
                <div>
                  <Button color='green' onClick={() =>{
                    this.gantiData(this.state.idbu)
                  }}>Edit</Button>
                 <Button color='red' onClick={() =>{
                   this.setState({
                     buttonog : false,
                     nama : "",
                     umur : 0,
                     gambar : ''
                   })
                  }}>Cancel</Button>
    
                  </div>
                            ) :
            
            (<Button color='green' onClick={()=>{this.kirimData()}}>Tambah</Button>)}
    
           
             
    
            {this.state.data.map(datum => {
              return (
                <div>
                    <Card>
    <Image src={datum.gambar} />
    <Card.Content>
      <Card.Header>{datum.nama}</Card.Header>
      <Card.Meta>
        <span className='date'>{datum.umur}</span>
      </Card.Meta>
      {/* <Card.Description>Matthew is a musician living in Nashville.</Card.Description> */}
    </Card.Content>
    {/* <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content> */}
  </Card>
                  
                  <Button color='red' onClick={()=>{
              this.deleteData(datum._id)
              }}>Hapus o'</Button>  
               <Button color='green' onClick={()=>{
              this.getDataEdit(datum._id)
              }}>Ganti</Button> 
                  </div>
              )
            })}
              
              




              
              
          </div>
        );
      }
}

