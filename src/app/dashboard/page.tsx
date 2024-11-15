'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Amplify } from 'aws-amplify'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { signOut, getCurrentUser } from 'aws-amplify/auth'
import outputs from '../../../amplify_outputs.json'

Amplify.configure(outputs)

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error('Error fetching user:', error)
        router.push('/login')
      }
    }

    fetchUser()
  }, [router])

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-4">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">Welcome to Your Dashboard</CardTitle>
              <Button onClick={handleSignOut} variant="outline">
                Log Out
              </Button>
            </div>
            <CardDescription>
              Hello, {user.username}! Here's your self-improvement journey at a glance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Dashboard content goes here */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Your goals will be displayed here.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Your progress will be shown here.</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}