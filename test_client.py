import requests
import json

# Base URL for your FastAPI app
BASE_URL = "http://localhost:8000"

def test_api():
    """Simple test client for the Stock Research API"""
    
    print("🧪 Testing Stock Market Research API")
    print("=" * 50)
    
    # Test health check
    print("1. Testing health check...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.json()}")
    except Exception as e:
        print(f"   Error: {e}")
    
    print("\n" + "-" * 50)
    
    # Test stock analysis
    print("2. Testing stock analysis...")
    
    # Example questions to test
    test_questions = [
        "What's the current price of Apple stock?",
        "Should I buy Tesla stock now?",
        "Hello, how are you?",  # This should not need search
        "Compare NVIDIA vs AMD stocks"
    ]
    
    for i, question in enumerate(test_questions, 1):
        print(f"\n   Test {i}: '{question}'")
        try:
            payload = {"question": question}
            response = requests.post(f"{BASE_URL}/analyze", json=payload)
            
            if response.status_code == 200:
                result = response.json()
                print(f"   ✅ Success!")
                print(f"   📊 Needs Search: {result['needs_search']}")
                print(f"   📝 Answer Length: {len(result['answer'])} characters")
                print(f"   🔗 Sources: {len(result['sources_used'])} found")
                
                # Show first 200 characters of answer
                answer_preview = result['answer'][:200] + "..." if len(result['answer']) > 200 else result['answer']
                print(f"   📄 Preview: {answer_preview}")
            else:
                print(f"   ❌ Error: {response.status_code}")
                print(f"   📄 Response: {response.text}")
                
        except Exception as e:
            print(f"   ❌ Error: {e}")
    
    print("\n" + "=" * 50)
    print("🎉 API Testing Complete!")

def interactive_client():
    """Interactive client for testing the API"""
    print("📈 Interactive Stock Research API Client")
    print("Type 'quit' to exit\n")
    
    while True:
        try:
            question = input("💭 Your stock question: ").strip()
            
            if question.lower() in ['quit', 'exit', 'q']:
                print("👋 Goodbye!")
                break
                
            if not question:
                continue
                
            print("🔄 Processing...")
            
            payload = {"question": question}
            response = requests.post(f"{BASE_URL}/analyze", json=payload)
            
            if response.status_code == 200:
                result = response.json()
                print(f"\n📊 Analysis Results:")
                print(f"🔍 Search Used: {'Yes' if result['needs_search'] else 'No'}")
                print(f"📝 Answer:\n{result['answer']}")
                
                if result['sources_used']:
                    print(f"\n🔗 Sources ({len(result['sources_used'])}):")
                    for i, source in enumerate(result['sources_used'][:5], 1):
                        print(f"   {i}. {source}")
                        
            else:
                print(f"❌ Error: {response.status_code}")
                print(f"Response: {response.text}")
                
            print("\n" + "-" * 80 + "\n")
            
        except KeyboardInterrupt:
            print("\n👋 Goodbye!")
            break
        except Exception as e:
            print(f"❌ Error: {e}")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "interactive":
        interactive_client()
    else:
        test_api() 