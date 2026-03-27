#!/usr/bin/env python3
"""
Backend API Testing for GestorEPI Landing Page
Tests the FastAPI backend endpoints
"""

import requests
import sys
import json
from datetime import datetime

class GestorEPIAPITester:
    def __init__(self, base_url="http://localhost:8001"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.results = []

    def log_result(self, test_name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {test_name} - PASSED")
        else:
            print(f"❌ {test_name} - FAILED: {details}")
        
        self.results.append({
            "test": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        })

    def test_health_endpoint(self):
        """Test health check endpoint"""
        try:
            response = requests.get(f"{self.base_url}/api/health", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                expected_keys = ['status', 'service']
                has_keys = all(key in data for key in expected_keys)
                success = has_keys and data.get('status') == 'healthy'
                details = f"Response: {data}" if success else f"Missing keys or wrong status: {data}"
            else:
                details = f"Status code: {response.status_code}, Response: {response.text}"
                
        except Exception as e:
            success = False
            details = f"Exception: {str(e)}"
            
        self.log_result("Health Check Endpoint", success, details)
        return success

    def test_contact_endpoint_valid_data(self):
        """Test contact form with valid data"""
        test_data = {
            "nome": "João Silva",
            "empresa": "Empresa Teste LTDA",
            "telefone": "(11) 99999-9999",
            "mensagem": "Gostaria de saber mais sobre o GestorEPI"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/contact",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=15
            )
            
            success = response.status_code == 200
            
            if success:
                data = response.json()
                # Check if response has expected structure
                has_status = 'status' in data
                has_message = 'message' in data
                success = has_status and has_message
                details = f"Response: {data}"
            else:
                details = f"Status code: {response.status_code}, Response: {response.text}"
                
        except Exception as e:
            success = False
            details = f"Exception: {str(e)}"
            
        self.log_result("Contact Form - Valid Data", success, details)
        return success

    def test_contact_endpoint_missing_required_fields(self):
        """Test contact form with missing required fields"""
        test_data = {
            "nome": "João Silva"
            # Missing empresa and telefone (required fields)
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/contact",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            # Should return 422 for validation error
            success = response.status_code == 422
            details = f"Status code: {response.status_code}, Response: {response.text}"
                
        except Exception as e:
            success = False
            details = f"Exception: {str(e)}"
            
        self.log_result("Contact Form - Missing Required Fields", success, details)
        return success

    def test_cors_headers(self):
        """Test CORS headers are present"""
        try:
            response = requests.options(f"{self.base_url}/api/health", timeout=10)
            
            cors_headers = [
                'access-control-allow-origin',
                'access-control-allow-methods',
                'access-control-allow-headers'
            ]
            
            headers_present = []
            for header in cors_headers:
                if header in response.headers:
                    headers_present.append(header)
            
            success = len(headers_present) >= 2  # At least origin and methods
            details = f"CORS headers found: {headers_present}"
                
        except Exception as e:
            success = False
            details = f"Exception: {str(e)}"
            
        self.log_result("CORS Headers", success, details)
        return success

    def run_all_tests(self):
        """Run all backend tests"""
        print(f"\n🔍 Testing GestorEPI Backend API at {self.base_url}")
        print("=" * 60)
        
        # Run tests
        self.test_health_endpoint()
        self.test_contact_endpoint_valid_data()
        self.test_contact_endpoint_missing_required_fields()
        self.test_cors_headers()
        
        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All backend tests passed!")
            return True
        else:
            print("⚠️  Some backend tests failed!")
            return False

def main():
    """Main test runner"""
    tester = GestorEPIAPITester()
    success = tester.run_all_tests()
    
    # Save results to file
    with open('/app/test_reports/backend_test_results.json', 'w') as f:
        json.dump({
            'timestamp': datetime.now().isoformat(),
            'total_tests': tester.tests_run,
            'passed_tests': tester.tests_passed,
            'success_rate': f"{(tester.tests_passed/tester.tests_run)*100:.1f}%",
            'results': tester.results
        }, f, indent=2)
    
    return 0 if success else 1

if __name__ == '__main__':
    sys.exit(main())