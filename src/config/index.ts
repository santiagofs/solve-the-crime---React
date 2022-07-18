import * as heroIcons from '../assets/icons/heroes'
import * as villainIcons from '../assets/icons/villains'
import { ItemCollection, ItemCollections } from '../engine/types'

const heroesCollection:ItemCollection = {
  'heroes.batman': {name: 'batman', icon: heroIcons.batman},
  'heroes.birdman': {name: 'birdman', icon: heroIcons.birdman},
  'heroes.cyclops': {name: 'cyclops', icon: heroIcons.cyclops},
  'heroes.flash': {name: 'flash', icon: heroIcons.flash},
  'heroes.hulk': {name: 'batman', icon: heroIcons.hulk},
  'heroes.leono': {name: 'leono', icon: heroIcons.leono},
  'heroes.prBlue': {name: 'blue power ranger', icon: heroIcons.prBlue},
  'heroes.prGreen': {name: 'green power ranger', icon: heroIcons.prGreen},
  'heroes.prPink': {name: 'pink power ranger', icon: heroIcons.prPink},
  'heroes.prRed': {name: 'red power ranger', icon: heroIcons.prRed},
  'heroes.prYellow': {name: 'yellow power ranger', icon: heroIcons.prYellow},
  'heroes.robocop': {name: 'batman', icon: heroIcons.robocop},
  'heroes.superhero6': {name: 'superhero 6', icon: heroIcons.superhero6},
  'heroes.superman': {name: 'superman', icon: heroIcons.superman},
  'heroes.thor': {name: 'batman', icon: heroIcons.thor},
}

const villainsCollection:ItemCollection = {
  'villains.alien1': {name: 'alien 1', icon: villainIcons.alien1},
  'villains.alien2': {name: 'alien 2', icon: villainIcons.alien2},
  'villains.flyman': {name: 'flyman', icon: villainIcons.flyman},
  'villains.guason': {name: 'guason', icon: villainIcons.guason},
  'villains.hannibal': {name: 'hannibal', icon: villainIcons.hannibal},
  'villains.mib1': {name: 'mib 1', icon: villainIcons.mib1},
  'villains.mib2': {name: 'mib 2', icon: villainIcons.mib2},
  'villains.mib3': {name: 'mib 3', icon: villainIcons.mib3},
  'villains.mib4': {name: 'mib 4', icon: villainIcons.mib4},
  'villains.mib5': {name: 'mib 5', icon: villainIcons.mib5},
  'villains.prisoner': {name: 'prisoner', icon: villainIcons.prisoner},
  'villains.psycho1': {name: 'psycho 1', icon: villainIcons.psycho1},
  'villains.psycho2': {name: 'psycho 2', icon: villainIcons.psycho2},
  'villains.supervillian': {name: 'supervillian', icon: villainIcons.supervillian},
  'villains.walter': {name: 'walter', icon: villainIcons.walter},
}


const gameConfig:{
  collections:ItemCollections,
  collectionKeys: {[collectionName:string]:string[]},
  levels:string[]
} = {
  collections: {heroes: heroesCollection, villains: villainsCollection},
  collectionKeys: {
    heroes: Object.keys(heroesCollection),
    villains: Object.keys(villainsCollection),
  },
  levels: [
    'level-01',
    'level-02',
    'level-03',
    'level-04',
    'level-05',
    'level-06',
    'level-07',
    'level-08',
    'level-09',
    'level-10',
    'level-11',
    'level-12'
  ]
}

export default gameConfig