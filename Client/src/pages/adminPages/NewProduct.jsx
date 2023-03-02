import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Sidebar from '../../components/admin/Sidebar'
import { Button, IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import OutlinedInput from '@mui/material/OutlinedInput';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../FireBase"
import TextField from '@mui/material/TextField'


const Container = styled.div`
`
const Wrapper = styled.div`
    min-height: 80vh; width: 100vw;
    display: flex; justify-content: center;
    align-items: center;
`
const FormContainer = styled.div`
    display: flex; flex-direction: column; width: 50%;
    justify-content: center; align-items: center;
`
const H1 = styled.h1`
    font-size: 24px;
   font-weight: 300;
`
const Form = styled.form`
    display: flex; flex-direction: column;
    width: 100%;
`
const Error = styled.span`
    align-self: center; margin-top: 20px; margin-bottom: 20px;
`
const UploadContainer = styled.div`
   display: flex;
`
const Textarea = styled.textarea`
    border-style: solid;
    white-space: pre-wrap;
    :focus {
        border-color: blue;
    }
`
function NewProduct() {
    const navigate = useNavigate();
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Image, setImage] = useState("");
    const [File, setFile] = useState(null);
    const [Price, setPrice] = useState("");
    const [error, seterror] = useState(false);
    const [Progress, setProgress] = useState("");


    console.log(Description)

    const handleUpload = async (e) => {
        // firebase upload
        const filename = new Date().getTime() + File.name
        const storage = getStorage(app);

        const storageRef = ref(storage, `images/${filename}`);

        const uploadTask = uploadBytesResumable(storageRef, File);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        setProgress("uploading please wait...")
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL)
                    setProgress("Upload finished")
                    setImage(downloadURL)
                    ;
                });
            }
        );
    } 

    const handlePost = async (e) => {
        e.preventDefault();
        // Send the post request
        try {

            const res = await axios.post("/product", { Title, Description, Image, Price }, { headers: { Cookie: "access_token" } },);
            console.log(res.data)
            navigate("/products")
        } catch (err) {
            console.log(err)
            seterror(true)
        }
    }
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
        <Container>
            <Sidebar />

            <Wrapper>
                        <FormContainer>
                            <H1>Add new product</H1>
                            <Form>
                                <OutlinedInput fullWidth={true} placeholder="Title" onChange={e => setTitle(e.target.value)} />
                                <TextField rows={10} cols={50} multiline placeholder="Description" onChange={e => setDescription(e.target.value)} />
                                <UploadContainer><Button sx={{ cursor: 'pointer' }}>
                                    <OutlinedInput sx={{ Height: '50%', Width: '50%', opacity: '1', flex: '1', cursor: 'pointer' }} type='file' onChange={e => setFile(e.target.files[0])} /> </Button>
                                    <Button sx={{ margin: '10px' }} variant='contained' onClick={handleUpload}>upload picture</Button>
                                </UploadContainer>
                                <Error>{Progress}</Error>
                                <OutlinedInput fullWidth={true} placeholder='Price' type="number" onChange={e => setPrice(e.target.value)} />
                            </Form>
                            {error && <Error>Somethinng went wrong</Error>}

                            <Button sx={{ marginTop: '20px' }} variant='contained' endIcon={<SendIcon />} onClick={handlePost} >Post</Button>

                        </FormContainer>

            </Wrapper>
        </Container>

    )
}

export default NewProduct