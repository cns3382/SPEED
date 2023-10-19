import './style.css'
import Image from 'next/image';
import axios from 'axios';
import React, { useState } from 'react';

const SubmissionForm = () => {
    const [article, setArticle] = useState({
        title: '',
        author: '',
        pubyear: '',
        journal_name: '',
        volume: '',
        number: '',
        pages: '',
        doi:'',
        });



              axios
              .post('http://localhost:3000/api/articles', article)
              .then((res) => {
                setArticle({
                    title: '',
                    author: '',
                    pubyear: '',
                    journal_name: '',
                    volume: '',
                    number: '',
                    pages: '',
                    doi:'',
                });
              })
              .catch((err) => {
                console.log('Error in Submitting Article!');
              });
    



              return (
                <div className='Submission Article'>
                <div className='container'>
                  <div className='row'>
                    <div className='col-md-8 m-auto'>
                      <br />

                    </div>
                    <div className='col-md-8 m-auto'>
                      <h1 className='display-4 text-center'>Submission Form</h1>
                      <p className='lead text-center'>Submit an article</p>


                  
                      <form noValidate>
                        <div className='form-group'>
                          <input
                            type='text'
                            placeholder='Title of the Article'
                            name='title'
                            className='form-control'
                            value={article.title}
                           
                          />
                        </div>
                        <br />
          
                        <div className='form-group'>
                          <input
                            type='text'
                            placeholder='Author'
                            name='authors'
                            className='form-control'
                            value={article.author}
                           
                          />
                        </div>
          
                        <div className='form-group'>
                          <input
                            type='number'
                            placeholder='Published Year'
                            name='published_year'
                            className='form-control'
                            value={article.pubyear}
                           
                          />
                        </div>
          
                        <div className='form-group'>
                          <input
                            type='text'
                            placeholder='Journal_name'
                            name='journal'
                            className='form-control'
                            value={article.journal_name}
                           
                          />
                        </div>
          
                        <div className='form-group'>
                          <input
                            type='number'
                            placeholder='Volume'
                            name='volume'
                            className='form-control'
                            value={article.volume}
                           
                          />
                        </div>
                        <div className='form-group'>
                          <input
                            type='number'
                            placeholder='Number'
                            name='journal_number'
                            className='form-control'
                            value={article.number}
                            
                          />
                        </div>

                        <div className='form-group'>
                          <input
                            type='number'
                            placeholder='Page'
                            name='pages_number'
                            className='form-control'
                            value={article.pages}
                            
                          />
                        </div>

                        <div className='form-group'>
                          <input
                            type='text'
                            placeholder='DOI'
                            name='doi'
                            className='form-control'
                            value={article.doi}
                          />
                        </div>
          
                        <input
                          type='submit'
                          className='btn btn-outline-warning btn-block mt-4'
                        />
                      </form>


                    </div>
                  </div>
                </div>
              </div>

              );


};
export default SubmissionForm;