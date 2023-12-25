import axios from "axios"
import { apiUrl } from "./consts"

export interface MemoryPost {
  id: string
  thumbnail: {
    url: string
    width: number
    height: number
  }
  primary: {
    url: string
    width: number
    height: number
  }
  secondary: {
    url: string
    width: number
    height: number
  }
  isLate: boolean
  memoryDay: string
}

export interface ProfilePicture {
  url: string
  width: number
  height: number
}

export interface User {
  id: string
  profilePicture: Media
  username: string
  fullname?: string
}

export interface Comment {
  content: string
  id: string
  postedAt: string
  user: User
}

export interface Location {
  latitude: number
  longitude: number
}

export interface Media {
  mediaType?: string
  url: string
  width: number
  height: number
}

export interface RealMoji {
  emoji: string
  id: string
  isInstant: boolean
  media: Media
  postedAt: string
  type: string
  user: User
}

export interface Tag {
  endIndex: number
  isUntagged: boolean
  replaceText: string
  searchText: string
  type: string
  user: User
}

export interface Post {
  comments: Comment[]
  creationDate: string
  id: string
  isLate: boolean
  isMain: boolean
  lateInSeconds: number
  location?: Location
  postType: string
  postedAt: string
  primary: Media
  secondary: Media
  retakeCounter: number
  realMojis: RealMoji[]
  tags: Tag[]
  takenAt: string
  updatedAt: string
  visibility: string[]
  unblurCount?: number
}

export interface Moment {
  id: string
  region: string
}

export interface PostDetails {
  moment?: Moment
  momentId: string
  posts: Post[]
  region: string
  user: User
}

export interface Feed {
  friendsPosts: PostDetails[]
  maxPostsPerMoment: number
  remainingPosts: number
  userPosts: PostDetails
}

export const sendPhoneNumber = async (phoneNumber: string): Promise<any> => {
  const { data } = await axios.post(apiUrl + "/login/send-code", {
    phone: phoneNumber,
  })
  return data
}

interface ConfirmationCodeInput {
  code: string
  otpSession: string
}

export const sendConfirmationCode = async ({
  code,
  otpSession,
}: ConfirmationCodeInput): Promise<any> => {
  const { data } = await axios.post(apiUrl + "/login/verify", {
    code: code,
    otpSession: otpSession,
  })
  console.log(data)
  return data
}

export const getFeed = async (): Promise<Feed> => {
  const { data } = await axios.get(apiUrl + "/friends/feed")
  return data.data.data
}

export const getMemoryFeed = async (): Promise<MemoryPost[]> => {
  const { data } = await axios.get(apiUrl + "/friends/mem-feed")
  return data.data.data
}

export const getMemoryFeedWithToken = async (
  token: string
): Promise<MemoryPost[]> => {
  const { data } = await axios.get(apiUrl + "/friends/mem-feed", {
    headers: {
      Token: token,
    },
  })
  const memoryPosts = data.data.data

  return memoryPosts.filter((memoryPost: MemoryPost) => {
    return (
      memoryPost.primary.url !==
      "https://cdn.bereal.network/Photos/6Gi1p2d8jAf6Kpvu41kyBHzuppA3/post/ks0hBBwq6deBklKQ.webp"
    ) // TODO Clean every unavailable pic
  })
}
