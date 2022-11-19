import React from 'react'
import { Dimmer, Loader, Image, Segment, Grid } from 'semantic-ui-react'

// const CircularLoaders = () => (
//   <div className='circular-loader'>

//     <Segment>
//       {/* <Dimmer active> */}
//         <Loader size='large' inline='centered'>
//             <h1 style={{ textAlign: 'center'}}>Loading</h1>
//         </Loader>
//       {/* </Dimmer> */}
//       <Image src='https://react.semantic-ui.com/images/wireframe/image.png'  />
//       <Image src='https://react.semantic-ui.com/images/wireframe/large-paragraph.png' />
//       <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
//       {/* <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' /> */}
//     </Segment>

//   </div>
// )

// export default CircularLoaders



const CircularLoader = () => {

    return (
        <div >
            <Grid >
                <Grid.Row>
                    <Grid.Column>
                        <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                    <Grid.Column>
                        <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                    <Grid.Column>
                        <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                    <Grid.Column>
                        <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                    <Grid.Column>
                        <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                    <Grid.Column>
                        <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                    <Grid.Column>
                        <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                    <Grid.Column>
                        <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                    <Grid.Column>
                        <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default CircularLoader