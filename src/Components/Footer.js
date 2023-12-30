import React from 'react'

function Footer() {
  return (
    <div>
      <div className="container-fulid footer">
        <div className="container">
            <div className="row">
                <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <p className='title'>About</p>
                            <p className='discription'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam in, natus illo facilis velit ex. Possimus voluptate quibusdam omnis placeat, voluptatibus consequuntur natus.
                            </p>
                            <div className="info">
                            <p><span className='text-bold'>Email:</span> vicky.kumar776655@gmail.com</p>
                            <p><span className='text-bold'>Phone:</span> +91 7903977041</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 links">
                            <div className="row">
                                <div className="col-6">
                                    <p className='title'>Quick Link</p>
                                    <ul>
                                        <li><a href='#'>Home</a></li>
                                        <li><a href='#'>About</a></li>
                                        <li><a href='#'>Blog</a></li>
                                        <li><a href='#'>Archived</a></li>
                                        <li><a href='#'>Auther</a></li>
                                        <li><a href='#'>Contact</a></li>
                                    </ul>
                                </div>
                                <div className="col-6">
                                    <p className='title'>Category</p>
                                    <ul>
                                        <li><a href='#'>Lifestyle</a></li>
                                        <li><a href='#'>Technology</a></li>
                                        <li><a href='#'>Travel</a></li>
                                        <li><a href='#'>Business</a></li>
                                        <li><a href='#'>Economy</a></li>
                                        <li><a href='#'>Sport</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="getintuch">
                        <div className="form">
                            <p className='title text-center'>Weekly Newsletter</p>
                            <p className='paragraph text-center'>Get blog artical and offers via email</p>
                            <div className="form">
                            <div className='d-flex'>
                                <input type='email' placeholder='Your Email' />
                                <i className="fa-regular fa-envelope"></i>
                            </div>
                            <button type='btn' className='bg-primary'>Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            

        </div>
      </div>
    </div>
  )
}

export default Footer
