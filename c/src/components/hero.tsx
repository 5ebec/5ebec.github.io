import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img, { FluidObject } from "gatsby-image"
import styled from "@emotion/styled"
import { css } from "@emotion/core"

interface HeroData {
  hero: {
    name: string
    desc: string
  }
  bgImg: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
  icon: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
}

const query = graphql`
  query HeroQuery {
    hero: heroYaml {
      name
      desc
    }
    bgImg: file(relativePath: { eq: "bg_img.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    icon: file(relativePath: { eq: "5ebec.jpg" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

const Header = styled.header`
  .header-bg {
    width: 50vw;
    height: 100vh;
    right: 0;
    @media (max-width: 70rem) {
      width: 100vw;
    }
  }
`

const Hero: React.FC = () => {
  const data: HeroData = useStaticQuery(query)
  return (
    <Header>
      <section className="hero is-fullheight">
        <div className="hero-body">
          <Img
            fluid={data.bgImg.childImageSharp.fluid}
            className="header-bg"
            alt="hero image"
            style={{ position: "absolute" }}
          />
          <div className="container">
            <figure
              data-sal="slide-right"
              data-sal-delay="100"
              className="image is-128x128"
            >
              <Img
                fluid={data.icon.childImageSharp.fluid}
                alt="heyhoe"
                css={css`
                  border-radius: 50%;
                `}
              />
            </figure>
            <h1
              data-sal="slide-right"
              data-sal-delay="200"
              className="title is-1 has-text-weight-light"
              css={css`
                font-family: "Nico Moji";
              `}
            >
              {data.hero.name}
            </h1>
            <h2
              data-sal="slide-right"
              data-sal-delay="400"
              className="subtitle is-4"
            >
              {data.hero.desc}
            </h2>
          </div>
        </div>
      </section>
    </Header>
  )
}

export default Hero
