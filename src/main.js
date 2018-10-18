import * as THREE from 'three'
import * as Stats from 'stats.js'

class Scene {
  constructor() {
    this.initialize()
    this.initializeStats()
    this.animate()
  }

  initialize() {
    this.initializeEngine()
    this.initializeCamera()
    this.initializeLights()
    this.initializeMaterials()
    this.initializeObjects()
    this.initializeFilters()
    this.initializePostprocess()
    this.initializeListeners()
    this.initializeClock()
  }

  initializeEngine() {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x0)

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)
  }

  initializeCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    
    this.camera.position.z = 10
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))
  }

  initializeLights() {
    this.ambLight = new THREE.PointLight( 0xffffff, 2, 75 )
    this.ambLight.position.set( 0, 0, 0 )
    this.ambLight.castShadow = true

    this.rLight = new THREE.PointLight( 0xffcccc, 1, 75 )
    this.rLight.position.set( -25, 50, 25 )
    this.rLight.castShadow = true

    this.gLight = new THREE.PointLight( 0xccffcc, 1, 75 )
    this.gLight.position.set( 25, 50, 25 )
    this.gLight.castShadow = true

    this.bLight = new THREE.PointLight( 0xccccff, 1, 75 )
    this.bLight.position.set( 0, 50, -25 )
    this.bLight.castShadow = true

    this.wLight = new THREE.PointLight( 0xffffff, 0.5, 75 )
    this.wLight.position.set( 0, -50, 0 )
    this.wLight.castShadow = true

    this.scene.add( this.ambLight )
    this.scene.add( this.rLight )
    this.scene.add( this.gLight )
    this.scene.add( this.bLight )
    this.scene.add( this.wLight )
  }

  initializeMaterials() {
    this.emissiveMaterial = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 5 } )
    this.emissiveMaterial.emissive =  new THREE.Color( 0xffffff )
    this.emissiveMaterial.emissiveIntensity = 1

    this.strandarMaterial = new THREE.MeshStandardMaterial( { color: 0xcccccc, metalness: 1 } )
  }

  initializeObjects() {
    this.masterCubeGeometry = new THREE.BoxGeometry( 3, 3, 3 )
    this.mastercube = new THREE.Mesh( this.masterCubeGeometry, this.emissiveMaterial )

    this.mastercube.rotation.x = Math.PI / 4
    this.mastercube.rotation.y = Math.PI / 4
    this.mastercube.rotation.z = 0

    this.scene.add( this.mastercube )

    this.cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 )
    this.cubes = []

    for(let i of '123456') {
      
      let cube = new THREE.Mesh( this.cubeGeometry, this.strandarMaterial )

      let angle = (i / 3) * Math.PI
      cube.position.set(
        (5 * Math.cos( angle )),
        (5 * Math.sin( angle )),
        0
      )

      this.cubes.push( cube )
      this.scene.add( cube )
    }
  }

  initializeFilters() {}
  
  initializePostprocess() {}

  initializeListeners() {
    window.addEventListener("resize", this.updateDimensions.bind(this))
  }

  initializeClock() {
    this.clock = new THREE.Clock()
  }

  initializeStats() {
    this.stats = new Stats()
    this.stats.showPanel( 0 )
    document.body.appendChild( this.stats.dom )
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this))

    this.stats.begin()

    this.mastercube.scale.set( 1 + Math.cos(this.clock.getElapsedTime()) / 8, 1 + Math.cos(this.clock.getElapsedTime()) / 5, 1 + Math.cos(this.clock.getElapsedTime()) / 8 )

    this.camera.translateX(0.05)
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))
  
    this.cubes.map((cube, i) => {
      cube.rotation.x += 0.01
      cube.rotation.y += 0.02
  
      let angle = ((i - this.clock.getElapsedTime() / 5) / (this.cubes.length / 2)) * Math.PI
      cube.position.set(
        (5 * Math.cos( angle )),
        (5 * Math.sin( angle )),
        cube.position.z
      )
    })

    this.stats.end()

    this.renderer.render(this.scene, this.camera)
  }

  updateDimensions() {
    let width = window.innerWidth
    let height = window.innerHeight

    this.renderer.setSize(width, height)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
  }
}

const scene = new Scene()
