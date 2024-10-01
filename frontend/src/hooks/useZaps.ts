'use client'
import { BACKEND_URL } from "@/app/config"
import axios from "axios"
import { useEffect, useState } from "react"


interface ZapType  {
    id: string,
    triggerId: string,
    userId: number,
    actions: ActionType[],
    trigger: TriggerType
}

interface TriggerType {
    id: string,
    zapId: string,
    triggerId: string,
    type: {
        id: string,
        name: string
    }
}

interface ActionType {
    id: string,
    zapId: string,
    actionId: string,
    sortingOrder: number,
    type: {
        id: string,
        name: string
    }
}

export default function useZaps() {
    const [zaps, setZaps] = useState<ZapType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                setError(null)
                
                
                const token = localStorage.getItem('token')
                
                
                if (!token) {
                    throw new Error("No authentication token found")
                }

              
                const res = await axios.get(`${BACKEND_URL}/zap`, {
                    headers: {
                        Authorization: token
                    }
                })
                

                if (!res.data || !res.data.zaps || !Array.isArray(res.data.zaps)) {
                    throw new Error("Invalid zaps data received")
                }

                setZaps(res.data.zaps)
             } catch (error) {
                console.error('Error in fetchData:', error)
                if (axios.isAxiosError(error)) {
                    console.error('Axios error details:', error.response?.data)
                    setError(`API error: ${error.response?.status} ${error.response?.statusText}`)
                } else {
                    setError(error instanceof Error ? error.message : 'An unknown error occurred')
                }
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return { zaps, loading, error }
}